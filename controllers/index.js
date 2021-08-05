const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

<<<<<<< HEAD
=======

>>>>>>> 8133041c3e28123c6c5d87c3e9156135a6989d60
module.exports = router;
