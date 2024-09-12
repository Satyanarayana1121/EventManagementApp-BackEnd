import { pool } from '../config/db.js';

// Get all events
const getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// RSVP for an event
const rsvpEvent = async (req, res) => {
  const { eventId, attendee } = req.body;
  try {
    // Check if the event exists
    const [eventRows] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    if (eventRows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Insert attendee into the attendees table
    await pool.query('INSERT INTO attendees (event_id, name) VALUES (?, ?)', [eventId, attendee]);

    res.status(200).json({ message: 'RSVP successful' });
  } catch (error) {
    console.error('Error RSVPing:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Get attendees for an event
const getAttendees = async (req, res) => {
  const eventId = req.params.id;  // Fetch event ID from route params
  try {
    const [attendees] = await pool.query('SELECT * FROM attendees WHERE event_id = ?', [eventId]);
    res.json(attendees);  // Send the list of attendees as a response
  } catch (error) {
    console.error('Error fetching attendees:', error.message);  // Log detailed error message
    res.status(500).json({ message: 'Server error' });
  }
};

const addEvent = async (req, res) => {
  const { title, description, date, time, location } = req.body;

  if (!title || !date || !time || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO events (title, description, date, time, location) VALUES (?, ?, ?, ?, ?)';
    await pool.query(query, [title, description, date, time, location]);

    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getEvents, rsvpEvent, getAttendees, addEvent };


