const SportEvent = require('../models/sport-event');
const ERROR_STATUS_CODE = 400;

createEvent = (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(ERROR_STATUS_CODE).json({
            success: false,
            error: 'You must provide an event data',
        })
    }

    const event = new SportEvent(body)

    if (!event) {
        return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
    }

    event
        .save()
        .then(() => {
            return response.status(201).json({
                success: true,
                id: event._id,
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
        })
    }

    Event.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'SportEvent not found!',
            })
        }
        event.name = body.name
        event.time = body.time
        event
            .save()
            .then(() => {
                return response.status(200).json({
                    success: true,
                    id: event._id,
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
    await SportEvent.findOneAndDelete({ _id: request.params.id }, (err, event) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }

        if (!event) {
            return response
                .status(404)
                .json({ success: false, error: `SportEvent not found` })
        }

        return response.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
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
        return response.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}

getEvents = async (_request, response) => {
    await SportEvent.find({}, (err, events) => {
        if (err) {
            return response.status(ERROR_STATUS_CODE).json({ success: false, error: err })
        }
        if (!events.length) {
            return response
                .status(404)
                .json({ success: false, error: `SportEvent not found` })
        }
        return response.status(200).json({ success: true, data: events })
    }).catch(err => console.log(err))
}

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventById,
}