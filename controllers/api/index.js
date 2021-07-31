const router = require('express').Router();

const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');
const userEventRoutes = require('./userEvent-routes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/userEvent', userEventRoutes);

module.exports = router;