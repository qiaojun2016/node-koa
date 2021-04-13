// Update with your config settings.
const path = require('path')
const BASE_PATH = path.join(__dirname, 'src', 'server', 'db')

module.exports = {
  test: {
    client: 'mysql',
    version: '5.7',
    connection: 'mysql://root:root@81.70.196.191:3306/testDB',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  development: {
    client: 'mysql',
    version: '5.7',
    connection: 'mysql://root:root@81.70.196.191:3306/testDB',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
};
