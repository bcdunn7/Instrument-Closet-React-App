import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';

const Calendar = ({ events }) => {

    return (
        <FullCalendar
            plugins={[ timeGridPlugin ]}
            initialView='timeGridWeek'
            slotDuration='01:00:00'
            allDaySlot={false}
            height={'auto'}
            nowIndicator={true}
            events={events}
            eventColor='#005662'
        />
    )
}

export default Calendar;