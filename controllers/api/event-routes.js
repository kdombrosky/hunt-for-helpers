const router = require('express').Router();
const { Event, User, UserEvent } = require('../../models');
const sequelize = require('../../config/connection');


// Read all events
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
router.get('/state/:id', (req,res) => {
    Event.findOne({
        where: {
            location: req.params.id
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
            res.status(404).json({ message: 'No events found in this state.' });
            return;
        }
        res.json(dbEventData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Create an event 
router.post('/', (req,res) => {
    console.log(req.session)
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
});

// Update event attendance /api/rsvp/?
router.put('/rsvp', (req, res) => {
    // Create the attendance update 
    UserEvent.create({
        user_id: req.body.user_id,
        event_id: req.body.event_id
    })
    .then(() => {
        // find the event the user is attending
        return Event.findOne({
            where: {
                id: req.body.event_id
            },
            attributes: [
                'id',
                'title',
                'date',
                'location',
                // use raw MySQL aggregate function query to get a count of how many userEvents the event has and return it under the name `userEvent_count`
                [
                    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE event.id = userEvent.event_id)'),
                    'userEvent_count'
                ]
            ]
        })
        .then(dbEventData => res.json(dbEventData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    });
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