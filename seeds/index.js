const seedUsers = require('./user-seeds');
const seedEvents = require('./event-seeds');
const seedUserEvent = require('./user-event-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedEvents();
  console.log('--------------');

  await seedUserEvent();
  console.log('--------------');

  process.exit(0);
};

seedAll();
