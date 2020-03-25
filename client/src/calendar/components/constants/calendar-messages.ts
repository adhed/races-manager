import { Messages } from "react-big-calendar";

export const calendarMessages: Messages = {
    date: 'Data',
    time: 'Czas',
    event: 'Wydarzenie',
    allDay: 'Cały dzień',
    week: 'Tydzień',
    work_week: 'Tydzień roboczy',
    day: 'Dzień',
    month: 'Miesiąc',
    previous: 'Wstecz',
    next: 'Dalej',
    yesterday: 'Wczoraj',
    tomorrow: 'Jutro',
    today: 'Dzisiaj',
    agenda: 'Agenda',
    showMore: (count: number) => `Pokaż ${count} więcej`,
    noEventsInRange: 'Brak wydarzeń w zakresie.'
};
