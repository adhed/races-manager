const express = require('express');
const ApiCtrl = require('../controllers/api.controller');

const router = express.Router()

router.post('/event', ApiCtrl.createEvent);
router.put('/event/:id', ApiCtrl.updateEvent);
router.delete('/event/:id', ApiCtrl.deleteEvent);
router.get('/event/:id', ApiCtrl.getEventById);
router.get('/events', ApiCtrl.getEvents);

router.post('/favourite-event/:uid', ApiCtrl.addEventToFavourites);
router.put('/favourite-event/:uid', ApiCtrl.removeEventFromFavourites);
router.get('/favourite-events/:uid', ApiCtrl.getFavouriteEvents);

router.get('/account/:uid', ApiCtrl.getAccountDetails);

module.exports = router;
