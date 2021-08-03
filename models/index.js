const User = require('./User');
const Event = require('./Event');
const UserEvent = require('./UserEvent');

// allow the user to have event
User.hasMany(Event, {
    foreignKey: 'user_id'
  });

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

// allow user to have many events
User.belongsToMany(Event, {
  through: UserEvent,
  foreignKey: 'user_id'
});

Event.belongsToMany(User, {
  through: UserEvent,
  foreignKey: 'event_id'
});

// UserEvent.hasMany(Event, {
//   foreignKey: 'event_id'
// })

  

module.exports = { Event, User, UserEvent };