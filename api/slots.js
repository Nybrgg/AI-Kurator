/**
 * Vercel Serverless Function for Available Slots
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

function getAvailableSlots(date, bookings) {
  const taken = bookings
    .filter(b => b.date === date)
    .map(b => b.slot);
  return TIME_SLOTS.filter(slot => !taken.includes(slot));
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ error: 'Missing date parameter' });
  }

  const bookings = loadBookings();
  const available = getAvailableSlots(date, bookings);

  return res.status(200).json(available);
};
