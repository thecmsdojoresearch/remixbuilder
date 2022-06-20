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
/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";

export const loader = (context) => {
  return route.loader(context);
}

export const action = (context) => {
  return route.action(context);
}
`;

const FSRAutoViewTemplate = `
import { useEffect } from 'react';
import { initStore } from '~/core';

export default () => {
  const data = useLoaderData();
  initStore(store);

  const state = store.state;

  /// initiate onload //////////////
  useEffect( () => {
    if (page.onload !== undefined) {
      page.onload();
    }
  });

  return (
  <>
    <!--fsr_route_template-->
  </>
  );
}
`;

const normalizeTemplate = function(html) {
  const lines = html.split("\n");

  const beginToken = '<!--%';
  const endToken = '-->';

  const regexp = new RegExp(`${beginToken}.*?${endToken}`);

  lines.forEach((line, lineOffset) => {
    // auto convert swith case and for loop
    lines[lineOffset] = convertIfAndFor(line, lineOffset, lines);
  });
  return lines.join("\n");
}

const convertIfAndFor = function(line, lineOffset, lines) {
  const beginToken = '<!--%';
  const endToken = '-->';
  const regexp = new RegExp(`${beginToken}.*?${endToken}`);

  // auto convert swith case and for loop
  if (regexp.exec(line)) {
    line = line.replace(beginToken,'').replace(endToken,'');
    const trimmedLineContent = line.trim();
    if (trimmedLineContent.substr(0,2) === 'if') {
      line = '{(() => {switch(true){' + 'case' + line.replace('if','') + ':' + ' return ( <>';
    } else if (trimmedLineContent.substr(0,6) === 'elseif') {
      line = '</>);' + 'case' + line.replace('elseif','') + ':' + ' return ( <>'
    } else if (trimmedLineContent.substr(0,4) === 'else') {
      line = '</>);' + 'default' + ':' + ' return ( <>'
    } else if (trimmedLineContent.substr(0,5) === 'endif') {
      line = '</>);' + '}})()}';
    } else if (trimmedLineContent.substr(0,3) === 'for') {
      line = '{(() => { const _ = [];' + "\n" + line + '{' + '_.push( <>';
    } else if (trimmedLineContent.substr(0,6) === 'endfor') {
      line = '</> )} return _; } )()}';
    }
  }
  return line;
};

const buildFSRoute = (path) => {
  const dirName = pathutil.dirname(path);
  const targetRoutePath = `./.remixapp/${dirName}.tsx`;

  let targetRouteContent = FSRAutoTemplate;

  //read the route file
  if (!fs.existsSync(`${dirName}/route.server.tsx`)) {
    console.log("ERROR: route.server.tsx must be defined!");
    return;
  }

  targetRouteContent += fs.readFileSync(`${dirName}/route.server.tsx`).toString() + "\n";

  //check if page.client.tsx exists
  if (fs.existsSync(`${dirName}/page.client.tsx`)) {
    targetRouteContent += "\n" + fs.readFileSync(`${dirName}/page.client.tsx`).toString();

    //now check if we have a store.client.tsx defined
    if (fs.existsSync(`${dirName}/store.client.tsx`)) {
      targetRouteContent += "\n" + fs.readFileSync(`${dirName}/store.client.tsx`).toString();
    } else {
      //we do not have the store file defined, we will just have the empty store
      targetRouteContent += "\n" + "const store = {}" + "\n";
    }

    //now we have a template, need to read from template.client.html
    if (fs.existsSync(`${dirName}/template.client.html`)) {
      let templateHTML = fs.readFileSync(`${dirName}/template.client.html`).toString();
      template = normalizeTemplate(templateHTML);
      targetRouteContent += "\n" + FSRAutoViewTemplate.replace('<!--fsr_route_template-->', normalizeTemplate(templateHTML));
    } else {
      console.log("ERROR: Missing Page Template: template.client.html");
      return;
    }
  }

  fs.writeFileSync(targetRoutePath, targetRouteContent);
  console.log(`generated route ${targetRoutePath}`);

}

const removeRoute = (path) => {
  const targetRoutePath = `./.remixapp/app/routes/${path}.tsx`;
  if (fs.existsSync(targetRoutePath)) {
    console.log(`unlinking ${targetRoutePath}`);
    fs.unlinkSync(targetRoutePath);
  }
};

// watch file changes in the app/routes/ directory
chokidar.watch('./app').on('all', (event, path) => {
  if (path.includes('app/routes/')) {
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
