/**
 * Vercel Serverless Function for Bookings
 */

const fs = require('fs');
const path = require('path');

const TIME_SLOTS = [
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00'
];

// Use /tmp directory for Vercel
const BOOKINGS_FILE = path.join('/tmp', 'bookings.json');

function loadBookings() {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

function isValidBooking(booking) {
  const required = ['name', 'email', 'phone', 'address', 'date', 'slot'];
  for (const field of required) {
    if (!booking[field]) return false;
  }
  if (!TIME_SLOTS.includes(booking.slot)) return false;
  return true;
}

function getAvailableSlots(date, bookings) {
  const taken = bookings
    .filter(b => b.date === date)
    .map(b => b.slot);
  return TIME_SLOTS.filter(slot => !taken.includes(slot));
}

module.exports = async (req, res) => {
  const bookings = loadBookings();

  if (req.method === 'GET') {
    return res.status(200).json(bookings);
  }

  if (req.method === 'POST') {
    try {
      const booking = req.body;

      if (!isValidBooking(booking)) {
        return res.status(400).json({ error: 'Missing or invalid fields' });
      }

      const available = getAvailableSlots(booking.date, bookings);
      if (!available.includes(booking.slot)) {
        return res.status(409).json({ error: 'Slot not available' });
      }

      booking.id = Date.now();
      bookings.push(booking);
      saveBookings(bookings);

      return res.status(201).json(booking);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
