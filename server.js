// 1. Import required modules
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// 2. Create an instance of Express app
const app = express();

// 3. Enable JSON body parsing and CORS
app.use(cors());
app.use(express.json());

// 4. Define the path to the dummy.json file
const DATA_FILE = path.join(__dirname, 'dummy.json');

// 5. Read events from dummy.json
const readEvents = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Failed to read dummy.json:', err);
    return [];
  }
};

// 6. Write updated events to dummy.json
const writeEvents = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('❌ Failed to write to dummy.json:', err);
  }
};

// 7. POST /api/events - Create a new event
// GET /api/events/:id - Get a single event by ID
app.get('/api/events/:id', (req, res) => {
  try {
    const eventId = Number(req.params.id);
    const events = readEvents();
    const event = events.find(e => e.id === eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("❌ Error fetching event:", error);
    res.status(500).json({ message: 'Failed to load event' });
  }
});


app.post('/api/events', (req, res) => {
  const { title, description, date, time, location, bannerImage } = req.body;

  if (!title || !description || !date || !time || !location) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const events = readEvents();

  const newEvent = {
    id: Date.now(),
    title,
    description,
    date,
    time,
    location,
    bannerImage: bannerImage || null
  };

  events.push(newEvent);
  writeEvents(events);

  res.status(201).json({
    message: "Event created successfully!",
    event: newEvent
  });
});

// 8. GET /api/events - Fetch all events
app.get('/api/events', (req, res) => {
  try {
    const events = readEvents();
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: 'Failed to load events' });
  }
});

// PUT /api/events/:id - Update an existing event
app.put('/api/events/:id', (req, res) => {
  const eventId = Number(req.params.id);
  const { title, description, date, time, location, bannerImage } = req.body;

  // Validate fields
  if (!title || !description || !date || !time || !location) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const events = readEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found!" });
  }

  // Update the event
  events[eventIndex] = {
    ...events[eventIndex],
    title,
    description,
    date,
    time,
    location,
    bannerImage: bannerImage || null
  };

  writeEvents(events);

  res.status(200).json({
    message: "Event updated successfully!",
    event: events[eventIndex]
  });
});

// DELETE /api/events/:id - Delete an event
app.delete('/api/events/:id', (req, res) => {
  const eventId = Number(req.params.id);
  const events = readEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found!' });
  }

  const deletedEvent = events.splice(eventIndex, 1)[0];
  writeEvents(events);

  res.status(200).json({
    message: 'Event deleted successfully!',
    deletedEvent,
  });
});

// POST /api/events/:id/register - Register for an event
app.post('/api/events/:id/register', (req, res) => {
  const eventId = Number(req.params.id);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required.' });
  }

  const events = readEvents();
  const eventIndex = events.findIndex(e => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  // Create registrants array if not present
  if (!events[eventIndex].registrants) {
    events[eventIndex].registrants = [];
  }

  // Add registrant
  events[eventIndex].registrants.push({ name, email, registeredAt: new Date() });
  writeEvents(events);

  res.status(201).json({
    message: 'Successfully registered!',
    registrant: { name, email }
  });
});


// 9. Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
