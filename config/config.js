const dev = {
  client: 'mysql',
  connection: {
    host : 'den1.mysql6.gear.host',
    user : 'feedback360',
    password : 'Xf96ry!7Jw8_',
    database : 'feedback360'
  },
  migrations: {
      directory: './db/migrations'
  },
  seeds: {
      directory: './db/seeds'
  }
};

const prod = {
  client: 'mysql',
  connection: {
    host : 'den1.mysql6.gear.host_old',
    user : 'feedback360',
    password : 'Xf96ry!7Jw8_',
    database : 'feedback360'
  },
  migrations: {
      directory: './db/migrations'
  },
  seeds: {
      directory: './db/seeds'
  }
};

module.exports = {
  development: dev,
  production: prod,
  super_secret : '5C;"j?0h-#&S'
};