import React from 'react';
import Modal from 'react-modal';

const EventDetailsModal = ({ event, isOpen, onRequestClose, onApply }) => {
  const handleApply = () => {
    onApply(event.id);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <button onClick={handleApply}>Apply for this class</button>
    </Modal>
  );
};

export default EventDetailsModal;