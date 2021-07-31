const { User } = require('../models');

const userData = [
    {
        username: 'slick_rick',
        password: '123456',
        
    },
    {
        username: 'Billy_bob',
        password: '1234567',
    },
    {
        username: 'Joe_Momma',
        password: '1234567',
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
