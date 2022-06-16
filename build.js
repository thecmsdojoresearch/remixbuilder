/**
 * the main file to start the build process
 */
const Rsync = require('rsync');
const chokidar = require('chokidar');
const toml = require('toml');
const fs = require('fs');
const basename = require('basename');

const buildTemplates = {
  'export_default_view': '',
  'export_loader_and_action': '',
  'import_controller': '',
  'import_view': ''
};

Object.keys(buildTemplates).forEach(key => {
  buildTemplates[key] = fs.readFileSync(`./buildtemplates/${key}.tsx`).toString();
});

chokidar.watch('./app').on('all', (event, path) => {
  if (path.includes('.toml') && path.includes('app/routes')) {
    console.log(event);
    if (event == "add" || event == "change") {
      const tomlContent = fs.readFileSync(path).toString();
      const routeConfig = toml.parse(tomlContent);
      const pathBasename = basename(path);
      const targetRoutePath = `./.remixapp/app/routes/${pathBasename}.tsx`;
      console.log(`generating route ${targetRoutePath}`);
      if (routeConfig.view === true) {
        const targetRouteContent = [
          'import_view',
          'import_controller',
          'export_loader_and_action',
          'export_default_view'
        ]
        .map(templateKey => buildTemplates[templateKey])
        .join("\n")
        .replace("{route_path}",pathBasename);

        fs.writeFileSync(targetRoutePath, targetRouteContent);
      } else {
        const targetRouteContent = [
          'import_controller',
          'export_loader_and_action'
        ]
        .map(templateKey => buildTemplates[templateKey])
        .join("\n")
        .replace("{route_path}",pathBasename);

        fs.writeFileSync(targetRoutePath, targetRouteContent);
      }
    } else if (event == "unlink") {
      const pathBasename = basename(path);
      const targetRoutePath = `./.remixapp/app/routes/${pathBasename}.tsx`;
      console.log(`unlinking ${targetRoutePath}`);
      fs.unlinkSync(targetRoutePath);
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
