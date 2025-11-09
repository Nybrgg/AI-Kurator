# AI-Kurator - Multi-Purpose Platform

This repository contains multiple applications:

1. **SaaS Web App for Window Cleaners** - A booking system for professional window cleaners
2. **AI Studie Hjælper** - Medicinregner for sygeplejestuderende (Medicine calculator for nursing students)

## 🏥 AI Studie Hjælper - Medicinregner

En professionel medicinregner til træning af sygeplejestuderende. Se [MEDICINREGNER.md](MEDICINREGNER.md) for komplet dokumentation.

**Funktioner:**
- 10 forskellige beregningstyper (ampul, tørstof, væske, dråbe, koncentration, vægtbaseret, kontinuerlig infusion, enhedskonvertering, elektrolyt, BSA)
- Webbaseret interface på `http://localhost:3000/medicine`
- REST API på `/medicine/calculate`
- Dansk formatering og sikkerhedskontrol
- Omfattende test suite

**Quick Start:**
```bash
cd backend
npm start
# Åbn browser: http://localhost:3000/medicine
```

---

## 🪟 Window Cleaning Booking System

This section contains a minimal prototype backend for a booking system aimed at professional window cleaners. The goal is to manage customers and bookings with a simple HTTP API.

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
