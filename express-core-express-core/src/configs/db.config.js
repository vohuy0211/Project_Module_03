const dev = {
  db: {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '02112003Huy',
    DATABASE: 'Project',
    dialect: 'mysql',
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
};

module.exports = dev;
