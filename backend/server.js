const http = require('http');
const fs = require('fs');
const url = require('url');

const TIME_SLOTS = [
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00'
];

const BOOKINGS_FILE = 'bookings.json';

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

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Window Cleaning SaaS API');
  }

  if (req.url.startsWith('/bookings')) {
    let bookings = loadBookings();
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(bookings));
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const booking = JSON.parse(body);
          if (!isValidBooking(booking)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Missing or invalid fields' }));
          }
          const available = getAvailableSlots(booking.date, bookings);
          if (!available.includes(booking.slot)) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Slot not available' }));
          }
          booking.id = Date.now();
          bookings.push(booking);
          saveBookings(bookings);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(booking));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }
  }

  if (req.method === 'GET' && req.url.startsWith('/slots')) {
    const { query } = url.parse(req.url, true);
    const date = query.date;
    if (!date) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing date parameter' }));
    }
    const bookings = loadBookings();
    const available = getAvailableSlots(date, bookings);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(available));
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
