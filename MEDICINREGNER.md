# 🏥 AI Studie Hjælper - Medicinregner for Sygeplejestuderende

En professionel medicinregner udviklet til træning af sygeplejestuderende i medicinsk dosering og beregninger. Systemet fungerer tilsvarende de professionelle beregningsværktøjer der anvendes på danske hospitaler.

## 📋 Indholdsfortegnelse

- [Overblik](#overblik)
- [Funktioner](#funktioner)
- [Installation](#installation)
- [Brug](#brug)
- [Beregningstyper](#beregningstyper)
- [API Reference](#api-reference)
- [Eksempler](#eksempler)
- [Test](#test)

## 🎯 Overblik

AI Studie Hjælperen er et komplet værktøj til medicinregning der understøtter:

- ✅ 10 forskellige beregningstyper
- ✅ Dansk formatering (komma som decimalseparator)
- ✅ Trinvise beregninger med validering
- ✅ Sikkerhedskontrol af resultater
- ✅ Webbaseret brugerinterface
- ✅ REST API for integration
- ✅ Omfattende test suite

## ⚡ Funktioner

### A. Ampulberegning
Beregner hvor meget ml der skal trækkes op fra en ampul.

**Input:** Ordineret dosis (mg), ampulstyrke (mg/ml)
**Output:** Volumen i ml

### B. Tørstofberegning
Beregner hvor meget væske der skal tilsættes tørstof.

**Input:** Tørstofmængde (mg), ønsket koncentration (mg/ml)
**Output:** ml væske at tilsætte

### C. Væskeberegning (infusion)
Beregner ml/time eller infusionstid.

**Input:** Volumen (ml), tid (timer) eller hastighed (ml/time)
**Output:** ml/time eller infusionstid

### D. Dråbehastighed
Beregner dråber/min baseret på dråbefaktor.

**Input:** Volumen (ml), tid (timer/min), dråbefaktor (15, 20, 60 dråber/ml)
**Output:** Dråber/min

### E. Koncentrationsberegning
Fortynding/blanding (C1×V1 = C2×V2).

**Input:** Aktuel koncentration, ønsket koncentration, volumen
**Output:** Blandingsforhold

### F. Vægtbaseret dosering
Beregner dosis baseret på vægt (mg/kg).

**Input:** Vægt (kg), dosis pr. kg, præparatstyrke
**Output:** Total dosis og volumen

### G. Kontinuerlig infusion (sprøjtepumpe)
Beregner ml/time for sprøjtepumpe.

**Input:** Ordineret dosis, koncentration i sprøjte
**Output:** ml/time på pumpen

### H. Enhedskonvertering
Konverterer mellem enheder.

**Understøtter:**
- mg ↔ g ↔ mikrogram
- ml ↔ l
- % ↔ mg/ml (1% = 10 mg/ml)
- mmol ↔ mg (kræver molarmasse)

### I. Elektrolytberegning
Beregner elektrolytmængder.

**Input:** mmol ønsket, koncentration (mmol/ml)
**Output:** ml præparat + sikkerhedsadvarsel

### J. Body Surface Area (BSA)
Mosteller-formel for BSA beregning.

**Input:** Vægt (kg), højde (cm)
**Output:** BSA i m²

## 🚀 Installation

### Forudsætninger
- Node.js (version 14 eller nyere)

### Trin 1: Klon repository
```bash
git clone <repository-url>
cd AI-Kurator
```

### Trin 2: Start serveren
```bash
cd backend
npm start
```

Serveren starter på `http://localhost:3000`

## 💻 Brug

### Webinterface
Åbn din browser og naviger til:
```
http://localhost:3000/medicine
```

### Trin-for-trin:
1. Vælg beregningstype fra dropdown
2. Indtast de nødvendige værdier
3. Klik "Beregn"
4. Se detaljeret resultat med:
   - Givne værdier
   - Anvendt formel
   - Trinvis beregning
   - Endeligt resultat
   - Sikkerhedskontrol

## 📖 Beregningstyper

### Eksempel 1: Ampulberegning

**Scenarie:** Patient skal have 75 mg. Ampullen indeholder 25 mg/ml.

```
Beregningstype: Ampul
Givne værdier: Dosis 75 mg, styrke 25 mg/ml
Formel: Dosis / styrke = volumen
Beregning: 75 mg / 25 mg/ml = 3 ml
✅ Resultat: 3 ml
Kontrol: Realistisk volumen → ja
```

### Eksempel 2: Vægtbaseret dosering

**Scenarie:** Barn 15 kg skal have 10 mg/kg paracetamol. Mikstur 24 mg/ml.

```
Beregningstype: Vægtbaseret dosering
Givne værdier: Vægt 15 kg, dosis 10 mg/kg, styrke 24 mg/ml
Formel: (Vægt × dosis/kg) / styrke = volumen
Beregning:
  Total dosis: 15 kg × 10 mg/kg = 150 mg
  Volumen: 150 mg / 24 mg/ml = 6,25 ml
✅ Resultat: 6,25 ml
Kontrol: Inden for max dosis (15 mg/kg) → ja
```

### Eksempel 3: Kontinuerlig infusion

**Scenarie:** Dobutamin 5 mikrogram/kg/min til patient 70 kg. Sprøjte med 250 mg i 50 ml.

```
Beregningstype: Kontinuerlig infusion (sprøjtepumpe)
Givne værdier: 5 mikrogram/kg/min, vægt 70 kg, 250 mg/50 ml
Formel: (Dosis × vægt × 60) / koncentration = ml/time
Beregning:
  Koncentration: 250 mg / 50 ml = 5 mg/ml = 5000 mikrogram/ml
  Dosis/min: 5 mikrogram/kg/min × 70 kg = 350 mikrogram/min
  Dosis/time: 350 mikrogram/min × 60 = 21.000 mikrogram/time = 21 mg/time
  ml/time: 21 mg/time / 5 mg/ml = 4,2 ml/time
✅ Resultat: 4,2 ml/time
Kontrol: Typisk dobutaminhastighed → ja
```

## 🔌 API Reference

### POST /medicine/calculate

Udfører en medicinsk beregning.

**Request Body:**
```json
{
  "type": "ampul",
  "dosis": 75,
  "styrke": 25
}
```

**Response:**
```json
{
  "beregningstype": "Ampulberegning",
  "givneVaerdier": {
    "dosis": "75 mg",
    "styrke": "25,00 mg/ml"
  },
  "formel": "Dosis / styrke = volumen",
  "beregning": "75 mg / 25,00 mg/ml = 3,00 ml",
  "resultat": "3,00 ml",
  "kontrol": "Realistisk volumen → ja"
}
```

### Beregningstyper og parametre

#### `ampul` - Ampulberegning
```json
{
  "type": "ampul",
  "dosis": number,        // mg
  "styrke": number        // mg/ml
}
```

#### `toerstof` - Tørstofberegning
```json
{
  "type": "toerstof",
  "toerstofMaengde": number,        // mg
  "oensketKoncentration": number    // mg/ml
}
```

#### `vaeske` - Væskeberegning
```json
{
  "type": "vaeske",
  "volumen": number,      // ml
  "tid": number,          // timer (null hvis hastighed er givet)
  "hastighed": number     // ml/time (null hvis tid er givet)
}
```

#### `draabe` - Dråbehastighed
```json
{
  "type": "draabe",
  "volumen": number,      // ml
  "tidTimer": number,     // timer
  "draabeFaktor": number  // 15, 20 eller 60
}
```

#### `koncentration` - Koncentrationsberegning
```json
{
  "type": "koncentration",
  "slutVolumen": number,          // ml
  "slutKoncentration": number,    // mg/ml
  "startKoncentration": number    // mg/ml
}
```

#### `vaegtbaseret` - Vægtbaseret dosering
```json
{
  "type": "vaegtbaseret",
  "vaegt": number,            // kg
  "dosisPerKg": number,       // mg/kg
  "praeparatStyrke": number,  // mg/ml
  "maxDosisPerKg": number     // mg/kg (valgfri)
}
```

#### `kontinuerlig` - Kontinuerlig infusion
```json
{
  "type": "kontinuerlig",
  "dosisMikrogramPerKgPerMin": number,  // µg/kg/min
  "vaegt": number,                      // kg
  "maengdeMg": number,                  // mg i sprøjte
  "volumenMl": number                   // ml i sprøjte
}
```

#### `enhedskonvertering` - Enhedskonvertering
```json
{
  "type": "enhedskonvertering",
  "vaerdi": number,
  "fraEnhed": string,    // "g", "mg", "mikrogram", "l", "ml", "%", "mg/ml", "mmol"
  "tilEnhed": string,    // samme som fraEnhed
  "molarmasse": number   // kun for mmol konverteringer (valgfri)
}
```

#### `elektrolyt` - Elektrolytberegning
```json
{
  "type": "elektrolyt",
  "mmolOensket": number,  // mmol
  "mmolPerMl": number     // mmol/ml
}
```

#### `bsa` - Body Surface Area
```json
{
  "type": "bsa",
  "vaegt": number,   // kg
  "hoejde": number   // cm
}
```

## 🧪 Test

Kør test suite:

```bash
cd backend
node test-calculator.js
```

**Forventet output:**
```
🧪 Starter Medicinregner Tests

📋 Test A: Ampulberegning
✅ PASSED: Ampul: 75mg / 25mg/ml = 3ml

📋 Test B: Tørstofberegning
✅ PASSED: Tørstof: 500mg ved 10mg/ml = 50ml

...

📊 Test Resultat:
   ✅ Passed: 17
   ❌ Failed: 0
   📈 Total:  17

🎉 Alle tests bestået!
```

## 📚 Vigtige noter

### Sikkerhed
- Dette værktøj er **kun til træning og uddannelse**
- Brug **aldrig** til reel patientbehandling uden supervision
- Alle beregninger skal verificeres af autoriseret sundhedspersonale

### Formatering
- Dansk standard med komma som decimalseparator
- Afrunding: typisk 1-2 decimaler for ml, 0 decimaler for dråber

### Validering
- Alle beregninger inkluderer sikkerhedskontrol
- Realistiske værdier verificeres automatisk
- Advarsler ved usædvanlige resultater

## 🛠️ Teknisk implementation

### Arkitektur
```
AI-Kurator/
├── backend/
│   ├── server.js              # HTTP server + API endpoints
│   ├── medicineCalculator.js  # Beregningsmotor
│   └── test-calculator.js     # Test suite
├── frontend/
│   └── index.html             # Webinterface
└── MEDICINREGNER.md           # Dokumentation
```

### Teknologier
- **Backend:** Node.js (ingen eksterne dependencies)
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **API:** REST JSON

## 📞 Support

Ved spørgsmål eller problemer, kontakt uddannelsesinstitutionen.

## 📄 Licens

Dette værktøj er udviklet til uddannelsesformål.

---

**Udviklet til sygeplejestuderende med fokus på sikkerhed og præcision** 🏥
