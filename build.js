/**
 * the main file to start the build process
 */
const Rsync = require('rsync');

const rsync = new Rsync()
  .set('delete')
  .set('progress')
  .flags('az')
  .source('./libs')
  .destination('.remixapp/app');

  rsync.execute((error, code, cmd) => {
    if (error === null) {
      console.log("Build synchronized");
    }
  });
