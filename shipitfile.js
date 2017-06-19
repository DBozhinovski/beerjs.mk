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
}

module.exports = root;