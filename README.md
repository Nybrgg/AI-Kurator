# SaaS Web App for Window Cleaners

This repository contains a minimal prototype backend for a booking system aimed at professional window cleaners. The goal is to manage customers and bookings with a simple HTTP API.

## Features

- Basic HTTP server using Node.js built-in modules (no external dependencies).
- Endpoints to list and create bookings stored in a local JSON file.

## Getting Started

1. Ensure Node.js is available (tested with Node 22).
2. Start the server:

```bash
cd backend
npm start
```

The server listens on port **3000** by default. Bookings are stored in `backend/bookings.json`.

### API Endpoints

- `GET /` – Health check.
- `GET /bookings` – Retrieve all bookings.
- `POST /bookings` – Create a new booking. Provide JSON body with booking data (e.g., name, email, date).

This is a simplified starting point for the booking module described in the project specification.
