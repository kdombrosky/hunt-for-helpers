const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User, UserEvent } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Event.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'description',
      'location',
      'date',
      'created_at',
    //   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
      res.render('dashboard', { events, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
