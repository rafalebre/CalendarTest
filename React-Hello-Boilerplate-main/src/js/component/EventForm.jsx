import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  // Send form data to server to create calendar event
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
    }),
  };
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", requestOptions);
    if (response.ok) {
      const event = await response.json();
      setCalendarEvents([...calendarEvents, event]);
      alert("Event created successfully!");
      setEventName("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
    } else {
      throw new Error("Failed to create event");
    }
  } catch (error) {
    alert(error.message);
  }

  setSubmitting(false);
};

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label>
          Event name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={calendarEvents.map((event) => ({
          title: event.name,
          start: `${event.date}T${event.time}`,
          end: `${event.date}T${event.time}`,
          location: event.location,
        }))}
      />
    </>
  );
};

export default EventForm;