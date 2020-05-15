const SportEvent = require('../models/sport-event');
const User = require('../models/user');
const ERROR_STATUS_CODE = 400;

createEvent = async (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(ERROR_STATUS_CODE).json({
            success: false,
            error: 'You must provide an event data',
        });
    }

    const event = new SportEvent(body)

    if (!event) {
        return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
    }

    if (body.author && body.author.uid) {
        await User.findOne({ uid: body.author.uid }, (err, user) => {
            if (user && user.details.isAdmin) {
                event.isActive = true;
            }
        });
    }

    event
        .save()
        .then(() => {
            return response.status(201).json({
                success: true,
                data: event,
                message: 'SportEvent has been created!',
            })
        })
        .catch(error => {
            return response.status(ERROR_STATUS_CODE).json({
                error,
                message: 'SportEvent not created!',
            })
        })
}

updateEvent = async (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(ERROR_STATUS_CODE).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    SportEvent.findOne({ _id: request.params.id }, (err, event) => {
        if (err) {
            return response.status(404).json({
                err,
                message: 'SportEvent not found!',
            })
        }

        event.name = body.name;
        event.date = body.date;
        event.serie = body.serie;
        event.discipline = body.discipline;
        event.place = body.place;
        event.link = body.link;
        event.type = body.type;
        event.isActive = body.isActive;
        event.coordinates = body.coordinates;
        event.description = body.description;

        event
            .save()
            .then(() => {
                return response.status(200).json({
                    success: true,
                    data: event,
                    message: 'SportEvent updated!',
                })
            })
            .catch(error => {
                return response.status(404).json({
                    error,
                    message: 'SportEvent not updated!',
                })
            })
    })
}

deleteEvent = async (request, response) => {
    await SportEvent.findOne({ _id: request.params.id }, (err, event) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!event) {
            return response
                .status(404)
                .json({ success: false, error: `SportEvent not found` })
        }

        return SportEvent.deleteOne({ _id: request.params.id }, (err, event) => {
            if (err) {
                return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
            }

            return response.status(200).json({ success: true, data: event })
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}

getEventById = async (request, response) => {
    await SportEvent.findOne({ _id: request.params.id }, (err, event) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!event) {
            return response
                .status(404)
                .json({ success: false, error: `SportEvent not found` })
        }

        if (event.author) {
            event.author.uid = null;
        }

        return response.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}

addEventToFavourites = async (request, response) => {
    await User.findOne({ uid: request.params.uid }, (err, user) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!user) {
            user = new User();
            user.uid = request.params.uid;
        }

        const alreadyExists = user.favouriteEvents.includes(request.body.eventId);

        if (!alreadyExists) {
            user.favouriteEvents.push(request.body.eventId);

            user
                .save()
                .then(() => {
                    return response.status(200).json({
                        success: true,
                        data: user,
                        message: 'Event added to favourites!',
                    })
                })
                .catch(error => {
                    return response.status(ERROR_STATUS_CODE).json({
                        error,
                        message: 'Event not added to favourites!',
                    })
                });
        } else {
            return response
                .status(ERROR_STATUS_CODE)
                .json({ success: false, error: `Event is already in favourites` });
        }
    }).catch(err => console.log(err))
}

removeEventFromFavourites = async (request, response) => {
    await User.findOne({ uid: request.params.uid }, (err, user) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!user) {
            user = new User();
            user.uid = request.params.uid;
        }

        const index = user.favouriteEvents.indexOf(request.body.eventId);

        if (index > -1) {
            user.favouriteEvents.splice(index, 1);
    
            user
                .save()
                .then(() => {
                    return response.status(200).json({
                        success: true,
                        data: user,
                        message: 'Event removed from favourites!',
                    })
                })
                .catch(error => {
                    return response.status(ERROR_STATUS_CODE).json({
                        error,
                        message: 'Event not removed from favourites!',
                    })
                });
        } else {
            return response
                .status(404)
                .json({ success: false, error: `Event is not in favourites` });
        }
    }).catch(err => console.log(err))
}

getFavouriteEvents = async (request, response) => {
    await User.findOne({ uid: request.params.uid }, (err, user) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!user) {
            return response
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return response.status(200).json({ success: true, data: user.favouriteEvents });
    }).catch(err => console.log(err))
}

getAccountDetails = async (request, response) => {
    await User.findOne({ uid: request.params.uid }, (err, user) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!user) {
            user = new User();
            user.uid = request.params.uid;
        }

        if (!user.details) {
            user.details = {
                isAdmin: false
            };

            user.save()
                .then(() => {
                    return response.status(200).json({
                        success: true,
                        data: user.details,
                    })
                })
                .catch(error => {
                    return response.status(ERROR_STATUS_CODE).json({
                        error,
                    })
                });
        }

        return response.status(200).json({
            success: true,
            data: user.details,
        });
        
    }).catch(err => console.log(err))
}

setEventActive = async (request, response) => {
    await SportEvent.findOne({ _id: request.params.id }, (err, event) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!event) {
            return response.status(ERROR_STATUS_CODE).json({
                err,
                message: 'Cannot find this event!',
            });
        }

        User.findOne({ uid: request.body.uid }, (err, user) => {
            if (err) {
                return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
            }

            if (!user || !user.details.isAdmin) {
                return response.status(ERROR_STATUS_CODE).json({
                    error,
                    message: 'You do not have access to do it!',
                });
            }

            event.isActive = true;
            event.save()
                .then(() => {
                    return response.status(200).json({
                        success: true,
                        data: event,
                        message: 'Event accepted.',
                    })
                })
                .catch((error) => {
                    return response.status(ERROR_STATUS_CODE).json({
                        error,
                        message: 'Event not accepted, there was an error.',
                    });
                });
        });
    }).catch(err => console.log(err))
}

getInactiveEvents = async (_request, response) => {
    await SportEvent.find({}, (err, events) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }
        if (!events.length) {
            return response
                .status(404)
                .json({ success: false, error: `SportEvent not found` })
        }

        const inactiveEvents = events.filter((event) => !event.isActive);

        return response.status(200).json({ success: true, data: inactiveEvents })
    }).catch(err => console.log(err))
}

getActiveEvents = async (_request, response) => {
    await SportEvent.find({}, (err, events) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!events.length) {
            return response
                .status(404)
                .json({ success: false, error: `SportEvent not found` })
        }

        const activeEvents = events
            .filter((event) => event.isActive)
            .map((sportEvent) => {
                return Object.assign({}, sportEvent.toObject(), {
                    author: {
                        name: sportEvent.author && sportEvent.author.name,
                        uid: null
                    } 
                });
            });

        return response.status(200).json({ success: true, data: activeEvents })
    }).catch(err => console.log(err))
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getActiveEvents,
    getEventById,
    addEventToFavourites,
    removeEventFromFavourites,
    getFavouriteEvents,
    getAccountDetails,
    setEventActive,
    getInactiveEvents
}