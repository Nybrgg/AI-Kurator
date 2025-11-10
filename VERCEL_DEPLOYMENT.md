# 🚀 Vercel Deployment Guide

Dette dokument forklarer hvordan du deployer AI-Kurator til Vercel.

## 📋 Forudsætninger

1. En Vercel konto (gratis på [vercel.com](https://vercel.com))
2. Git repository (dette projekt)
3. Vercel CLI (valgfri, men anbefalet)

## 🎯 Metode 1: Deploy via Vercel Dashboard (Anbefalet)

### Trin 1: Forbind GitHub Repository

1. Gå til [vercel.com](https://vercel.com) og log ind
2. Klik på "Add New Project"
3. Vælg "Import Git Repository"
4. Vælg dette repository (Nybrgg/AI-Kurator)

### Trin 2: Konfigurer Project

Vercel vil automatisk detektere konfigurationen fra `vercel.json`.

**Project Settings:**
- Framework Preset: `Other`
- Root Directory: `./` (rod af projektet)
- Build Command: (lad stå tom)
- Output Directory: (lad stå tom)

### Trin 3: Deploy

1. Klik på "Deploy"
2. Vent mens Vercel bygger og deployer
3. Din app vil være tilgængelig på en URL som: `https://ai-kurator-xxx.vercel.app`

## 🖥️ Metode 2: Deploy via Vercel CLI

### Installation af Vercel CLI

```bash
npm install -g vercel
```

### Login til Vercel

```bash
vercel login
```

### Deploy

```bash
# Fra projektets rod
vercel

# For production deployment
vercel --prod
```

## 🌐 Endpoints efter Deployment

Når appen er deployed, vil følgende endpoints være tilgængelige:

### Medicinregner
- **Frontend:** `https://din-app.vercel.app/medicine`
- **API:** `https://din-app.vercel.app/medicine/calculate`

### Booking System
- **Health check:** `https://din-app.vercel.app/`
- **Bookings:** `https://din-app.vercel.app/bookings`
- **Slots:** `https://din-app.vercel.app/slots?date=YYYY-MM-DD`

## 📁 Projektstruktur for Vercel

```
AI-Kurator/
├── api/                          # Vercel Serverless Functions
│   ├── index.js                 # Health check endpoint
│   ├── bookings.js              # Booking API
│   ├── slots.js                 # Available slots API
│   └── medicine/
│       └── calculate.js         # Medicine calculator API
├── frontend/                     # Static frontend files
│   └── index.html               # Medicinregner interface
├── backend/                      # Original backend (for local dev)
│   ├── server.js
│   └── medicineCalculator.js
├── vercel.json                   # Vercel configuration
└── package.json                  # Project metadata
```

## ⚙️ Vercel Configuration (vercel.json)

Projektet er allerede konfigureret med `vercel.json` der indeholder:

- **Builds:** Kompilerer API functions og static files
- **Routes:** Mapper URL paths til korrekte handlers

## 🔄 Automatic Deployments

Når du har forbundet GitHub til Vercel:

- **Production:** Hver push til main branch deployer automatisk til production
- **Preview:** Hver push til andre branches opretter preview deployments
- **Pull Requests:** Hver PR får sit eget preview deployment

## 🧪 Test Deployment

### Test Medicinregner

```bash
# Via curl
curl -X POST https://din-app.vercel.app/medicine/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ampul",
    "dosis": 75,
    "styrke": 25
  }'
```

### Test Booking System

```bash
# List bookings
curl https://din-app.vercel.app/bookings

# Get available slots
curl "https://din-app.vercel.app/slots?date=2024-06-01"
```

## 📊 Environment Variables (Valgfri)

Hvis du ønsker at tilføje environment variables:

1. Gå til Project Settings i Vercel Dashboard
2. Vælg "Environment Variables"
3. Tilføj nødvendige variabler

## 🔒 Sikkerhed

### CORS Headers

Hvis du skal tillade requests fra specifikke domæner, kan du tilføje CORS headers i API functions:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

## 📝 Custom Domain (Valgfri)

For at tilføje et custom domain:

1. Gå til Project Settings
2. Vælg "Domains"
3. Tilføj dit domain
4. Følg instruktionerne for DNS konfiguration

## 🐛 Troubleshooting

### Deployment Fejler

**Problem:** Build fejler
**Løsning:** Check build logs i Vercel Dashboard

**Problem:** API returnerer 500 error
**Løsning:** Check function logs i Vercel Dashboard under "Functions"

**Problem:** Static files loader ikke
**Løsning:** Verificer at `frontend/` mappen eksisterer og indeholder filerne

### Lokal Test af Vercel Setup

```bash
# Installer Vercel CLI
npm install -g vercel

# Kør lokalt med Vercel runtime
vercel dev
```

Dette starter en lokal server der simulerer Vercel's production environment.

## 📈 Performance

Vercel's Edge Network sikrer:
- ⚡ Hurtig load tid globalt
- 🌍 CDN distribution
- 🔄 Automatic caching
- 📊 Analytics (gratis på hobby plan)

## 💰 Pricing

- **Hobby (Gratis):**
  - Ubegrænsede deployments
  - 100GB bandwidth/måned
  - Serverless function execution: 100GB-hours

- **Pro ($20/måned):**
  - Mere bandwidth
  - Prioriteret support
  - Team collaboration

For dette projekt er Hobby planen mere end tilstrækkelig.

## 🎉 Done!

Din AI-Kurator app skulle nu være live på Vercel!

**Quick Links:**
- 🌐 Din deployed app: `https://din-app.vercel.app`
- 🏥 Medicinregner: `https://din-app.vercel.app/medicine`
- 📊 Vercel Dashboard: `https://vercel.com/dashboard`

---

**Support:**
- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
