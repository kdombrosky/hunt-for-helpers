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
        user_id: 3
    },
    {
        title: 'Beach Cleanup',
        description: "Help clean up one of Florida's most popular beaches following the end of the summer tourist season!",
        location: 'Daytona Beach, FL',
        date: '09/01/2021',
        user_id: 2
    },
    {
        title: 'Park Cleanup',
        description: 'Join us for a day of drinks and picking up trash at the most popular park in Winter Springs!',
        location: 'Red Bug Lake Park, FL',
        date: '10/01/2021',
        user_id: 4
    },
    {
        title: 'Shelter Build',
        description: 'Come help build a small group of homeless shelters, verified for placement, made with durable materials. All materials and tools will already be on site, but feel free to bring anything that may help.',
        location: 'Conway Fire Station, FL',
        date: '08/10/2021',
        user_id: 4
    }
]

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
