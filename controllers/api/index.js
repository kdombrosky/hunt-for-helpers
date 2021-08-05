const router = require('express').Router();

const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');
<<<<<<< HEAD

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
=======
// const userEventRoutes = require('./userEvent-routes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
// router.use('/userEvent', userEventRoutes);
>>>>>>> 8133041c3e28123c6c5d87c3e9156135a6989d60

module.exports = router;