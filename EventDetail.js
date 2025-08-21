import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';

function EventDetail() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate(); // Initialize navigate

  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  // Registration state
  const [registration, setRegistration] = useState({ name: '', email: '' });
  const [registerMessage, setRegisterMessage] = useState('');

  // Fetch event data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error('Error fetching event:', err);
        setError('Failed to load event.');
      });
  }, [id]);

  // Handle input changes for registration form
  const handleChange = e => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  // Handle registration submit
  const handleRegister = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/events/${id}/register`, registration)
      .then(res => {
        setRegisterMessage(res.data.message);
        setRegistration({ name: '', email: '' }); // Reset form
        return axios.get(`http://localhost:5000/api/events/${id}`);
      })
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error('Registration failed:', err);
        setRegisterMessage('Registration failed.');
      });
  };

  if (error) return <p style={styles.error}>{error}</p>;
  if (!event) return <p style={styles.loading}>Loading event...</p>;

  return (
    <div style={styles.page}>
      {/* Navigation buttons */}
      <div style={styles.navButtons}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>⬅️ Go Back</button>
        <Link to="/" style={styles.homeLink}>🏠 Home</Link>
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>{event.title}</h1>

        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>

        {event.bannerImage && (
          <img
            src={event.bannerImage}
            alt={event.title}
            style={styles.bannerImage}
          />
        )}

        <Link to={`/edit/${event.id}`}>
          <button style={styles.editButton}>Edit Event</button>
        </Link>

        <hr style={styles.separator} />

        <div style={styles.registerSection}>
          <h2>Register to Attend</h2>
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={registration.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={registration.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.registerButton}>Register</button>
          </form>
          {registerMessage && <p style={styles.registerMessage}>{registerMessage}</p>}
        </div>

        <div style={styles.attendeesSection}>
          <h3>Registered Attendees</h3>
          {event.registrants && event.registrants.length > 0 ? (
            <ul style={styles.attendeesList}>
              {event.registrants.map((reg, index) => (
                <li key={index} style={styles.attendeeItem}>
                  👤 <strong>{reg.name}</strong> – 📧 {reg.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No one has registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh',
    padding: '20px',
    color: '#fff',

    // Background image setup:
    backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', // nice parallax effect
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  backButton: {
    padding: '10px 18px',
    fontSize: '14px',
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  homeLink: {
    color: '#dcdcdc',
    textDecoration: 'none',
    padding: '10px 18px',
    backgroundColor: '#333',
    borderRadius: '6px',
    fontSize: '14px',
  },
  container: {
    maxWidth: '700px',
    margin: 'auto',
    background: 'rgba(0, 0, 0, 0.65)',  // darker overlay for readability
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '15px',
    textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginTop: '20px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.7)',
  },
  editButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#9c27b0',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  separator: {
    margin: '40px 0',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  registerSection: {
    color: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '15px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
  },
  registerButton: {
    padding: '12px',
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  registerMessage: {
    color: '#a6f0a6',
    marginTop: '10px',
    fontWeight: '600',
  },
  attendeesSection: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.3)',
  },
  attendeesList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  attendeeItem: {
    marginBottom: '10px',
    fontSize: '1.1rem',
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: '20px',
  },
  loading: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: '20px',
  }
};

export default EventDetail;
