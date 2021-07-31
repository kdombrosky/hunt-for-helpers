const { Event } = require('../models');

const eventData = [
    {
        title: 'Star Fish Rescue',
        description: 'Return peach to the atlantic ocean',
        location: 'Florida',
        date: '10/21/2021',
        user_id: 1
    },
    {
        title: 'Find Nemo',
        description: 'help dory remember where nemo went.',
        location: 'California',
        date: '10/28/2021',
        user_id: 1
    },
    {
        title: 'Help bruce with fish food anonymous',
        description: 'Help bruce and friends not eat fish for food because they are friends.',
        location: 'Washington',
        date: '11/05/2021',
    },
]

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
