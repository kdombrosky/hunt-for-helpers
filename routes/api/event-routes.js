const router = require('express').Router();
const { Event, User, Attendance } = require('../../models');

// Read all events
router.get('/', (req,res) => {
    Event.findAll({
        attributes: ['id', 'title', 'location', 'date', 'description'],
        // sort newest to oldest
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Attendance,
                attributes: ['going']
            }
        ]
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Read a single event 
router.get('/:id', (req,res) => {
    Event.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'location', 'date', 'description'],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Attendance,
                attributes: ['going']
            }
        ]
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create an event 
router.post('/', (req,res) => {
    Event.create({
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description
    })
    .then(dbEventData => res.json(dbEventData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update event attendance
router.put('', (req, res) => {
    // Create the attendance update 
    Attendance.create({
        going: req.body.res
    })
    .then(() => {
        // find the event the user is attending/or not? 
        return Event.findOne({
            where: {
                id: req.body.event_id
            },
            attributes: [
                'id',
                'title',
                'date',
                'location',
                // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
            ]
        })
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