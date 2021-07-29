const router = require('express').Router();

const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');
const attendanceRoutes = require('./attendance-routes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/attendance', attendanceRoutes);

module.exports = router;