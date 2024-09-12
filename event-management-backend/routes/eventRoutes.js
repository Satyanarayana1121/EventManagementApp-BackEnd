// routes/eventRoutes.js
import { Router } from 'express';
import { getEvents, rsvpEvent, getAttendees, addEvent } from '../controllers/eventController.js';

const router = Router();

// Existing routes
router.get('/events', getEvents);  // Get all events
router.post('/events', addEvent);  // POST to add event (make sure this route exists)
router.post('/rsvp', rsvpEvent);
router.get('/events/:id/attendees', getAttendees);

export default router;
