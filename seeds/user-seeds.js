const { User } = require('../models');

const userData = [
    {
        username: 'recycle_champion',
        password: '1234'
    },
    {
        username: 'manatee_master',
        password: '1234'
    },
    {
        username: 'fish_father',
        password: '1234'
    },
    {
        username: 'atlantic_local',
        password: '1234'
    },
    {
        username: 'greenfish',
        password: '1234'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
