import React, { useEffect } from 'react';
import { Event, Calendar, momentLocalizer, Formats } from 'react-big-calendar'
import { connect } from 'react-redux';
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.scss';
import { ApplicationState } from '../../../state/ducks';
import { mapSportEventsToCalendar } from '../../../shared/utils/sport-event.utils';
import { selectEventById, fetchSportEvents } from '../../../state/ducks/sport-event/actions';
import { calendarMessages } from '../constants/calendar-messages';
import 'moment/locale/pl';

moment.locale('pl');
const localizer = momentLocalizer(moment);

type EventsCalendarProps = {
    events: Event[];
    selectEventById: (id: string) => void;
    fetchSportEvents: () => void;
}

function EventsCalendar(props: EventsCalendarProps): JSX.Element {
    const customFormats: Formats = {
        weekdayFormat: 'dddd',
    }
    useEffect(() => {
        if (!props.events.length) {
            props.fetchSportEvents();
        }
    }, []);

    const handleSelectEvent = (event: any): void => {
        props.selectEventById(event.id);
    }

    return <div className="events-calendar">
        <Calendar
            localizer={localizer}
            events={props.events}
            onSelectEvent={handleSelectEvent}
            culture="pl-PL"
            startAccessor="start"
            endAccessor="end"
            formats={customFormats}
            messages={calendarMessages}
        />
    </div>;
}

function mapStateToProps(state: ApplicationState) {
    const { sportEvent } = state;
    return {
        events: mapSportEventsToCalendar(sportEvent.data),
    };
}
export default connect(mapStateToProps, { selectEventById, fetchSportEvents })(EventsCalendar);