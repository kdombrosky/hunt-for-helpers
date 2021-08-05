const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

// get all events for homepage
router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Event.findAll({
    attributes: [
        'id',
        'title',
        'description',
        'location',
        'date',
        'created_at',
        // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbEventData => {
      const events = dbEventData.map(event => event.get({ plain: true }));

      res.render('home-page', {
        events,
        loggedIn: req.session.loggedIn
      });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});



module.exports = router;
