import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventDetailsModal from './EventDetailsModal.jsx';
import BookingForm from './BookingForm.jsx';
import EventForm from './EventForm.jsx';

export default function Calendar({ events: initialEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    setSelectedEvent(clickInfo.event);
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
    <div>
      <EventForm />
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
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        >
          <BookingForm event={selectedEvent} />
        </EventDetailsModal>
      )}
    </div>
  );
}