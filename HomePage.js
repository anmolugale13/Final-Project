import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDate, setFilterDate] = useState('All');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        alert("Event deleted successfully.");
        fetchEvents();
      })
      .catch(err => {
        console.error("Delete failed:", err);
        alert("Failed to delete event.");
      });
  };

  // 🔎 Filter & search logic
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesCategory = true;
    if (filterCategory !== 'All') matchesCategory = event.category === filterCategory;

    let matchesDate = true;
    const today = new Date();
    const eventDate = new Date(event.date);
    if (filterDate === 'This Week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      matchesDate = eventDate >= today && eventDate <= weekFromNow;
    } else if (filterDate === 'This Month') {
      matchesDate = eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎉 All Local Events</h1>
        <Link to="/create">
          <button style={styles.createButton}>➕ Create New Event</button>
        </Link>
      </div>

      {/* 🔎 Search & Filter */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={styles.select}>
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
        </select>

        <select value={filterDate} onChange={e => setFilterDate(e.target.value)} style={styles.select}>
          <option value="All">All Dates</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      <div style={styles.cardContainer}>
        {filteredEvents.map(event => (
          <div key={event.id} style={styles.card}>
            <Link to={`/event/${event.id}`} style={styles.link}>
              <h2 style={styles.eventTitle}>{event.title}</h2>
              <p style={styles.datetime}>📅 {event.date} at ⏰ {event.time}</p>
              <p style={styles.location}>📍 {event.location}</p>
              <p style={styles.registration}>
                🧑‍🤝‍🧑 <strong>Registrations:</strong> {event.registrants ? event.registrants.length : 0}
              </p>
            </Link>

            <button
              onClick={() => handleDelete(event.id)}
              style={styles.deleteButton}
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px', minHeight: '100vh', fontFamily: 'Arial, sans-serif', background: 'linear-gradient(to right, #f0f2f5, #e0eafc)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '2.2rem', color: '#333' },
  createButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  filterContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
  searchInput: { padding: '8px', fontSize: '14px', flex: 1 },
  select: { padding: '8px', fontSize: '14px' },
  cardContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'transform 0.2s ease', position: 'relative' },
  link: { textDecoration: 'none', color: '#333' },
  eventTitle: { fontSize: '20px', marginBottom: '10px', color: '#333' },
  datetime: { margin: '5px 0', fontSize: '14px' },
  location: { margin: '5px 0', fontSize: '14px' },
  registration: { marginTop: '10px', fontWeight: 'bold', fontSize: '14px', color: '#007BFF' },
  deleteButton: { marginTop: '15px', backgroundColor: '#dc3545', color: 'white', padding: '8px 12px', fontSize: '14px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default HomePage;
