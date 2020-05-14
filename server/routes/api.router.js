const express = require('express');
const ApiCtrl = require('../controllers/api.controller');

const router = express.Router()

router.post('/event', ApiCtrl.createEvent);
router.put('/event/:id', ApiCtrl.updateEvent);
router.delete('/event/:id', ApiCtrl.deleteEvent);
router.get('/event/:id', ApiCtrl.getEventById);
router.get('/events', ApiCtrl.getActiveEvents);
router.get('/inactive-events', ApiCtrl.getInactiveEvents);

router.post('/favourite-event/:uid', ApiCtrl.addEventToFavourites);
router.put('/favourite-event/:uid', ApiCtrl.removeEventFromFavourites);
router.get('/favourite-events/:uid', ApiCtrl.getFavouriteEvents);

router.get('/account/:uid', ApiCtrl.getAccountDetails);

router.put('/active-event/:id', ApiCtrl.setEventActive);

module.exports = router;
