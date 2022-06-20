/**
 * the main file to start the build process
 *
 * each route can be either an MVC route or an FSR (full stack route)
 */

console.log(require('./dummy_config.js'));
process.exit(1);


process.chdir(__dirname);

const Rsync = require('rsync');
const chokidar = require('chokidar');
const toml = require('toml');
const fs = require('fs');
const basename = require('basename');
const pathutil = require('path');
const { exec, execSync } = require('child_process');

const FSRAutoTemplate = `
///// The following is generated /////
import { useLoaderData } from "@remix-run/react";
import BaseStore from "~/core/BaseStore";
import CoreRoute from "~/core/Route";

const route = new Route();

export async function loader(context) {
  return route.loader(context);
}

export async function action(context) {
  return route.action(context);
}

//super trick to do on demand view export
export default (typeof route.view === 'function') ? () => {
  const data = useLoaderData();
  const store = new BaseStore()._populateState(route.getState())._init();
  const state = route.getState();
  route.view({data, store, state});
  {RouteTemplate}
  return route.template({data, store, state});
} : null
`;

const convertSwitchAndFor = function() {
  const lines = html.split("\n");

  const beginToken = '<!--%';
  const endToken = '-->';

  const regexp = new RegExp(`${beginToken}.*?${endToken}`);

  // auto convert swith case and for loop
  lines.forEach((line, lineOffset) => {
    if (regexp.exec(line)) {
      lines[lineOffset] = line.replace(beginToken,'').replace(endToken,'');
      const trimmedLineContent = lines[lineOffset].trim();
      if (trimmedLineContent.substr(0,2) === 'if') {
        lines[lineOffset] = '{(() => {switch(true){' + 'case' + lines[lineOffset].replace('if','') + ':' + ' return ( <>';
      } else if (trimmedLineContent.substr(0,6) === 'elseif') {
        lines[lineOffset] = '</>);' + 'case' + lines[lineOffset].replace('elseif','') + ':' + ' return ( <>'
      } else if (trimmedLineContent.substr(0,4) === 'else') {
        lines[lineOffset] = '</>);' + 'default' + ':' + ' return ( <>'

      } else if (trimmedLineContent.substr(0,5) === 'endif') {
        lines[lineOffset] = '</>);' + '}})()}';
      } else if (trimmedLineContent.substr(0,3) === 'for') {
        lines[lineOffset] = '{(() => { const _ = [];' + "\n" + lines[lineOffset] + '{' + '_.push( <>';
      } else if (trimmedLineContent.substr(0,6) === 'endfor') {
        lines[lineOffset] = '</> )} return _; } )()}';
      }
    }
  });
  return lines.join("\n");
};

const buildFSRoute = (path) => {
  //smart search for the corresponding html template in the current directory
  let currentRouteContent = fs.readFileSync(path).toString();
  currentRouteContent = currentRouteContent + "\n" + FSRAutoTemplate;
  const possibleHTMLTemplateFile = path.replace(".tsx",".html");
  console.log(possibleHTMLTemplateFile);
  if (fs.existsSync(possibleHTMLTemplateFile)) {
    currentRouteContent = currentRouteContent.replace(
      '{RouteTemplate}',`
      route.template = ({data, store, state}) => {
        return (
      ${fs.readFileSync(possibleHTMLTemplateFile).toString()}
        );
      }`);
  } else {
    currentRouteContent = currentRouteContent.replace('{RouteTemplate}','');
  }
  const targetRouteContent = currentRouteContent;
  const targetRoutePath = `./.remixapp/${path}`;
  console.log(`generating route ${targetRoutePath}`);
  fs.writeFileSync(targetRoutePath, targetRouteContent);
}

const buildMVCRoute = (path) => {
  const tomlContent = fs.readFileSync(path).toString();
  const routeConfig = toml.parse(tomlContent);
  const targetRouteContentLines = [];
  const controllersToImport = [];

  const relativeRoutePath = pathutil.dirname(path).replace('app/routes','');
  const numOfDots = relativeRoutePath.split('/').length;
  const dotPath = Array(numOfDots).fill('..').join('/');
  //find out how many controllers need to be imported
  Object.keys(routeConfig.request).forEach(requestMethod => {
    targetRouteContentLines.push(`import Controller${requestMethod} from '${dotPath}/server/controllers/${routeConfig.request[requestMethod].controller}';`);
  });

  //check if this is a page route, export the default view component
  if (routeConfig.route.type === "page") {
    //automatically discover the related view file
    targetRouteContentLines.push(`import View from '${dotPath}/webclient/views/${routeConfig.request.GET.controller}/${routeConfig.request.GET.action}';`);
    targetRouteContentLines.push(`export default View;`);
  }

  //now generate the loader and actions, if necessary
  Object.keys(routeConfig.request).forEach(requestMethod => {
    if (requestMethod === 'GET') {
      //we generate the loader
      targetRouteContentLines.push(`export const loader = async (context) => {`);
        targetRouteContentLines.push(`  const controller = new Controller${requestMethod}();`);
        targetRouteContentLines.push(`  controller._init(context);`);
        targetRouteContentLines.push(`  return controller.${routeConfig.request[requestMethod].action}();`);
        targetRouteContentLines.push(`}`);
    } else {
      //we generate the action
      targetRouteContentLines.push(`export const action = async (context) => {`);
        targetRouteContentLines.push(`  const controller = new Controller${requestMethod}();`);
        targetRouteContentLines.push(`  controller._init(context);`);
        targetRouteContentLines.push(`  return controller.${routeConfig.request[requestMethod].action}();`);
        targetRouteContentLines.push(`}`);
    }
  });

  const targetRouteContent = targetRouteContentLines.join("\n");
  const targetRoutePath = `./.remixapp/${path.replace('.toml','.tsx')}`;
  const targetRoutePathDir = pathutil.dirname(targetRoutePath);
  console.log(`generating route ${targetRoutePath}`);
  if (!fs.existsSync(targetRoutePathDir)) {
    execSync(`mkdir -p ${targetRoutePathDir}`);
  }
  fs.writeFileSync(targetRoutePath, targetRouteContent);
};

const removeRoute = (path) => {
  const targetRoutePath = `./.remixapp/app/routes/${path}.tsx`;
  console.log(`unlinking ${targetRoutePath}`);
  fs.unlinkSync(targetRoutePath);
};

chokidar.watch('./app').on('all', (event, path) => {
  const pathExtension = pathutil.extname(path);
  if (pathExtension == '.toml' && path.includes('app/routes')) {
    if (event == "add" || event == "change") {
      buildMVCRoute(path);
    } else if (event == "unlink") {
      removeRoute(path);
    }
  } else if (pathExtension == '.tsx' && path.includes('app/routes')) {
    if (event == "add" || event == "change") {
      buildFSRoute(path);
    } else if (event == "unlink") {
      removeRoute(path);
    }
  } else {
    startSync();
  }
});

const startSync = () => {
  const rsyncCore = new Rsync()
  .set('delete')
  .set('progress')
  .flags('az')
  .source('./app/core')
  .destination('.remixapp/app');

  rsyncCore.execute((error, code, cmd) => {
    if (error === null) {
      console.log("core synchronized");
    }
  });
  const rsyncLibs = new Rsync()
  .set('delete')
  .set('progress')
  .flags('az')
  .source('./app/libs')
  .destination('.remixapp/app');

  rsyncLibs.execute((error, code, cmd) => {
    if (error === null) {
      console.log("libs synchronized");
    }
  });

  const rsyncServer = new Rsync()
  .set('delete')
  .set('progress')
  .flags('az')
  .source('./app/server')
  .destination('.remixapp/app');

  rsyncServer.execute((error, code, cmd) => {
    if (error === null) {
      console.log("server synchronized");
    }
  });

  const rsyncWebclient = new Rsync()
  .set('delete')
  .set('progress')
  .flags('az')
  .source('./app/webclient')
  .destination('.remixapp/app');

  rsyncWebclient.execute((error, code, cmd) => {
    if (error === null) {
      console.log("webclient synchronized");
    }
  });
};

const remixDevServerProcess = exec('npm run dev', {cwd: './.remixapp'});

remixDevServerProcess.on('exit', function (code, signal) {
  console.log('child process exited with ' +
              `code ${code} and signal ${signal}`);
});

remixDevServerProcess.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});

remixDevServerProcess.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});
