import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => {
        console.error('Error fetching event:', err);
        setError('Failed to load event.');
      });
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/events/${id}`, formData)
      .then(() => {
        alert('Event updated!');
        navigate('/');
      })
      .catch(err => {
        console.error('Error updating event:', err);
        alert('Failed to update event.');
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        alert('Event deleted!');
        navigate('/');
      })
      .catch(err => {
        console.error('Error deleting event:', err);
        alert('Failed to delete event.');
      });
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!formData) return <p>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <Link to="/" style={styles.backLink}>← Back to Home</Link>
        <h2 style={styles.title}>✏️ Edit Event</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
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
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="bannerImage"
            placeholder="Banner Image URL"
            value={formData.bannerImage}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.updateButton}>💾 Update Event</button>
          <button type="button" onClick={handleDelete} style={styles.deleteButton}>🗑️ Delete Event</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff'
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 0,
  },
  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '12px',
  },
  backLink: {
    color: '#ddd',
    textDecoration: 'underline',
    marginBottom: '20px',
    display: 'inline-block',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
  },
  updateButton: {
    padding: '12px',
    marginBottom: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default EditEvent;
