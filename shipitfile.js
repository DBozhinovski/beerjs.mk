function root(shipit) {
  require('shipit-deploy')(shipit); // eslint-disable-line

  shipit.initConfig({
    default: {
      workspace: '/tmp/.shipit',
      deployTo: '/var/www/beerjs.mk',
      dirToCopy: '.',
      keepReleases: 2,
      ignores: ['.git', 'node_modules'],
      deleteOnRollback: false,
      repositoryUrl: 'git@github.com:DBozhinovski/beerjs.mk.git'
    },
    production: {
      servers: 'root@beerjs.mk'
    }
  });

  shipit.task('restart-api', () => shipit.remote(
    'pm2 stop API && pm2 delete API && cd /var/www/API/current && NODE_ENV=production NODE_DEBUG=debug pm2 start index.js --name=API'
  ));
  shipit.task('npm-reinstall', () =>
    shipit.remote(
      'rm -rf /var/www/API/current/node_modules && cd /var/www/API/current && npm install'
    )
  );
}

module.exports = root;