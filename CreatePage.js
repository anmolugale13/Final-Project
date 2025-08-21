import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    bannerImage: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/events', formData)
      .then(() => navigate('/'))
      .catch(err => alert('Error creating event: ' + err.message));
  };

  return (
    <>
      {/* Background image */}
      <div style={styles.background}></div>

      {/* Form container */}
      <div style={styles.container}>
        <h2 style={styles.title}>🎯 Create New Event</h2>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ ...styles.input, height: '100px', resize: 'vertical' }}
          />

          <div style={styles.row}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ ...styles.input, flex: 1 }}
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={{ ...styles.input, flex: 1, marginLeft: '10px' }}
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="bannerImage"
            placeholder="Banner Image URL (optional)"
            value={formData.bannerImage}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>🚀 Create Event</button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // Safari support
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    fontFamily: 'Arial, sans-serif',
    color: '#222',
    position: 'relative',
    zIndex: 2,
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.7)',
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '26px',
    color: '#222',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginBottom: '15px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '14px',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  }
};

export default CreateEvent;
