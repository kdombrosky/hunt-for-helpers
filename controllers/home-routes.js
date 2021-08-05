const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all events for homepage
router.get('https://sheltered-savannah-38970.herokuapp.com/', withAuth, (req, res) => {
  console.log('======================');
  Event.findAll({
    attributes: [
        'id',
        'title',
        'description',
        'location',
        'date',
        'created_at',
        //[sequelize.literal('(SELECT COUNT(*) FROM userEvent WHERE event.id = userEvent.event_id)'), 'rsvp_count']
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


router.get('/Event/:id', (req, res) => {
  Event.findOne({
      where: {
          id: req.params.id
      },
      attributes: [
          'id',
          'title',
          'created_at'
      ],
      include: [
          {
          model: User,
          attributes: ['username']
          }
      ]
      })
      .then(dbEventData => {
          if (!dbEventData) {
          res.status(404).json({ message: 'No event found with this id' });
          return;
          }
  
          // Serialize the data
          const event = dbEventData.get({ plain: true });
  
          // Pass data to template
          res.render('single-event', {
              event,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
