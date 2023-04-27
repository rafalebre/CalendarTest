import React, { useState, useEffect } from 'react';
import Calendar from './Calendar.jsx';
import EventForm from './EventForm.jsx';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <EventForm onAddEvent={(event) => setEvents([...events, event])} />
      <Calendar events={events} />
    </div>
  );
};

export default Home;