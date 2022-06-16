/**
 * the main file to start the build process
 */
const Rsync = require('rsync');

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

startSync();
