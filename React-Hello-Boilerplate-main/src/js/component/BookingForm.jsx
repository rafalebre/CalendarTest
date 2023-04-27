import React, { useState } from 'react';

const BookingForm = ({ event, onBookingSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      const booking = {
        eventId: event.id,
        name,
        email,
        phone
      };
  
      await onBookingSubmit(booking);
      alert("Booking created successfully!");
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      alert(error.message);
    }
  
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book {event.title}</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default BookingForm;