const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Event, User, UserEvent } = require('../../models');


// Read all events at /api/events
router.get('/', (req,res) => {
    Event.findAll({
        attributes: [
            'id', 
            'title', 
            'location', 
            'date', 
            'description',
            // include total rsvp count for post
            [sequelize.literal('(SELECT COUNT(*) FROM userEvent WHERE event.id = userEvent.event_id)'), 'rsvp_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get all events by state /api/events/state/FL
// router.get('/state/:id', (req,res) => {
//     Event.findOne({
//         where: {
//             location: req.params.id
//         },
//         attributes: [
//             'id', 
//             'title', 
//             'location', 
//             'date', 
//             'description',
//             // include total rsvp count for post
//             [sequelize.literal('(SELECT COUNT(*) FROM userEvent WHERE event.id = userEvent.event_id)'), 'rsvp_count']
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//     .then(dbEventData => {
//         if (!dbEventData) {
//             res.status(404).json({ message: 'No events found in this state.' });
//             return;
//         }
//         res.json(dbEventData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// Get a single event (for single-event page to rsvp) at /api/events/1
router.get('/:id', (req, res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'title', 
            'location', 
            'date', 
            'description',
            // include total rsvp count for post
            [sequelize.literal('(SELECT COUNT(*) FROM userEvent WHERE event.id = userEvent.event_id)'), 'rsvp_count']
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
            res.json(dbEventData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create an event at /api/events
router.post('/', (req,res) => {
    if(req.session) {
        Event.create({
            title: req.body.title,
            location: req.body.location,
            date: req.body.date,
            description: req.body.description,
            user_id: req.session.user_id
        })
        .then(dbEventData => res.json(dbEventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// Update event rsvp_count at /api/events/rsvp
router.put('/rsvp', (req, res) => {
    // make sure the session exists first
    if (req.session) {
        // pass session id along with all destructured properties on req.body
        Event.rsvp({ ...req.body, user_id: req.session.user_id }, { UserEvent, Event, User })
        .then(updatedRsvpData => res.json(updatedRsvpData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// Update an event 
router.put('/:id', (req, res) => {
    Event.update(
        {
            title: req.body.title,
            location: req.body.location,
            date: req.body.date,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id' });
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete an event
router.delete('/:id', (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbEventData => {
        if (!dbEventData) {
            res.status(404).json({ message: 'No event found with this id' });
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;