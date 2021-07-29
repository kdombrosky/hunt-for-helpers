const { Event } = require('../models');

const eventData = [
    {
        location: 'Florida',
        date: '10/21/2021',
        attendance: 10
    },
    {
        location: 'California',
        date: '10/28/2021',
        attendance: 5
    },
    {
        location: 'Washington',
        date: '11/05/2021',
        attendance: 25
    },
    {
        location: 'Nevada',
        date: '11/20/2021',
        attendance: 50
    }
]

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
