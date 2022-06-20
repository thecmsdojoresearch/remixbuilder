/**
 * the main file to start the build process
 *
 * each route can be either an MVC route or an FSR (full stack route)
 */
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

const convertIfAndFor = function() {
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

const removeRoute = (path) => {
  const targetRoutePath = `./.remixapp/app/routes/${path}.tsx`;
  console.log(`unlinking ${targetRoutePath}`);
  fs.unlinkSync(targetRoutePath);
};

// watch file changes in the app/routes/ directory
chokidar.watch('./app').on('all', (event, path) => {
  if (path.includes('app/routes/')) {
    if (event == "add" || event == "change") {
      console.log(path);
      //buildFSRoute(path);
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
