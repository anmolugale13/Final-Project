import React from 'react';

const EventList = ({ events }) => {
  if (!events.length) return <p>No events found</p>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.date}</p>
          <p>{event.category}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
