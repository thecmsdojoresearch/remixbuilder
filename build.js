/**
 * the main file to start the build process
 */
const Rsync = require('rsync');
const chokidar = require('chokidar');
const toml = require('toml');
const fs = require('fs');
const basename = require('basename');

const buildRoute = (path) => {
  const tomlContent = fs.readFileSync(path).toString();
  const routeConfig = toml.parse(tomlContent);
  const targetRouteContentLines = [];
  const controllersToImport = [];

  //find out how many controllers need to be imported
  Object.keys(routeConfig.request).forEach(requestMethod => {
    targetRouteContentLines.push(`import Controller${requestMethod} from '../server/controllers/${routeConfig.request[requestMethod].controller}';`);
  });

  //check if this is a resource route
  if (routeConfig.is_resource === false) {
    //automatically discover the related view file
    targetRouteContentLines.push(`import View from '../webclient/views/${routeConfig.request.GET.controller}/${routeConfig.request.GET.action}';`);
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
  const pathBasename = basename(path);
  const targetRoutePath = `./.remixapp/app/routes/${pathBasename}.tsx`;
  console.log(`generating route ${targetRoutePath}`);
  fs.writeFileSync(targetRoutePath, targetRouteContent);
};

const removeRoute = (path) => {
  const pathBasename = basename(path);
  const targetRoutePath = `./.remixapp/app/routes/${pathBasename}.tsx`;
  console.log(`unlinking ${targetRoutePath}`);
  fs.unlinkSync(targetRoutePath);
};

chokidar.watch('./app').on('all', (event, path) => {
  if (path.includes('.toml') && path.includes('app/routes')) {
    if (event == "add" || event == "change") {
      buildRoute(path);
    } else if (event == "unlink") {
      removeRoute(path);
    }
  } else {
    startSync();
  }
});

const startSync = () => {
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
