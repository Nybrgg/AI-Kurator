# SaaS Web App for Window Cleaners

This repository contains a minimal prototype backend for a booking system aimed at professional window cleaners. The goal is to manage customers and bookings with a simple HTTP API.

## Features

- Basic HTTP server using Node.js built-in modules (no external dependencies).
- Endpoints to list, create, and check available booking slots stored in a local JSON file.

## Getting Started

1. Ensure Node.js is available (tested with Node 22).
2. Start the server:

```bash
cd backend
npm start
```

The server listens on port **3000** by default. Bookings are stored in `backend/bookings.json`.

### Booking Data

Bookings require the following JSON fields:

- `name`
- `email`
- `phone`
- `address`
- `date` (e.g. `2024-06-01`)
- `slot` – one of `08:00-10:00`, `10:00-12:00`, `12:00-14:00`, `14:00-16:00`

### API Endpoints

- `GET /` – Health check.
- `GET /bookings` – Retrieve all bookings.
- `POST /bookings` – Create a new booking. Provide JSON body with the required booking fields.
- `GET /slots?date=YYYY-MM-DD` – List available time slots for the given date.

This is a simplified starting point for the booking module described in the project specification.
