const express = require('express');
const EventCtrl = require('../controllers/event.controller');

const router = express.Router()

router.post('/event', EventCtrl.createEvent);
router.put('/event/:id', EventCtrl.updateEvent);
router.delete('/event/:id', EventCtrl.deleteEvent);
router.get('/event/:id', EventCtrl.getEventById);
router.get('/events', EventCtrl.getEvents);

router.post('/favourite-event/:uid', EventCtrl.addEventToFavourites);
router.put('/favourite-event/:uid', EventCtrl.removeEventFromFavourites);
router.get('/favourite-events/:uid', EventCtrl.getFavouriteEvents);


module.exports = router;
