// const seedUsers = require('./user-seeds');
const seedEvents = require('./event-seeds');
// const seedAttendances = require('./attendance-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
//   await seedUsers();
//   console.log('--------------');

  await seedEvents();
  console.log('--------------');

//   await seedAttendances();
//   console.log('--------------');

  process.exit(0);
};

seedAll();
