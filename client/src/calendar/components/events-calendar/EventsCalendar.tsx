import React from 'react';
import { Event, Calendar, momentLocalizer,  } from 'react-big-calendar'
import { connect } from 'react-redux';
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.scss';
import { ApplicationState } from '../../../state/ducks';
import { mapSportEventsToCalendar } from '../../../shared/utils/sport-event.utils';
import { selectEventById } from '../../../state/ducks/sport-event/actions';

const localizer = momentLocalizer(moment);

type EventsCalendarProps = {
    events?: Event[];
    selectEventById: (id: string) => void; 
}

function EventsCalendar(props: EventsCalendarProps): JSX.Element {
    const handleSelectEvent = (event: any): void => {
        props.selectEventById(event.id);
    }

    return <div className="events-calendar">
        <h2>Calendar</h2>
        <Calendar
            localizer={localizer}
            events={props.events}
            onSelectEvent={handleSelectEvent}
            culture="PL-pl"
            startAccessor="start"
            endAccessor="end"
        />
    </div>;
}

function mapStateToProps(state: ApplicationState) {
    const { sportEvent } = state;
    return {
        events: mapSportEventsToCalendar(sportEvent.data),
    };
}
export default connect(mapStateToProps, { selectEventById })(EventsCalendar);