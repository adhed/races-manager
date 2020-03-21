import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.scss';

const localizer = momentLocalizer(moment)

export default function EventsCalendar() {
    return <div className="events-calendar">
        <h2>Calendar</h2>
        <Calendar
            localizer={localizer}
            events={[]}
            culture="PL-pl"
            startAccessor="start"
            endAccessor="end"
        />
    </div>;
}
