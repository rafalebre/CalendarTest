import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({ events: initialEvents, onEventClick }) {
  const [events, setEvents] = useState(initialEvents);

  const handleDateSelect = (selectInfo) => {
    const [eventDate, eventTime] = selectInfo.startStr.split('T');
    const [newEvent] = events.filter((event) => event.title === 'New Event');
    if (newEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === newEvent.id
            ? {
                ...newEvent,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                backgroundColor: '#0071C5',
              }
            : event
        )
      );
    } else {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title: 'New Event',
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          backgroundColor: '#0071C5',
        },
      ]);
    }
  };

  const handleEventClick = (clickInfo) => {
    onEventClick(clickInfo.event);
  };

  const handleEventChange = (changeInfo) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === changeInfo.event.id
          ? {
              ...event,
              start: changeInfo.event.startStr,
              end: changeInfo.event.endStr,
            }
          : event
      )
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      selectable={true}
      selectMirror={true}
      select={handleDateSelect}
      events={events}
      eventClick={handleEventClick}
      eventChange={handleEventChange}
    />
  );
}