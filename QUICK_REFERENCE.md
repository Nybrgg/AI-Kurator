# 📝 Medicinregner - Hurtig Reference

## Formler & Beregninger

### A. Ampulberegning
```
Volumen (ml) = Dosis (mg) / Styrke (mg/ml)
```
**Eksempel:** 75 mg / 25 mg/ml = 3 ml

---

### B. Tørstofberegning
```
Væske (ml) = Tørstof (mg) / Ønsket koncentration (mg/ml)
```
**Eksempel:** 500 mg / 10 mg/ml = 50 ml væske

---

### C. Væskeberegning
```
Hastighed (ml/time) = Volumen (ml) / Tid (timer)
Tid (timer) = Volumen (ml) / Hastighed (ml/time)
```
**Eksempel:** 1000 ml / 8 timer = 125 ml/time

---

### D. Dråbehastighed
```
Dråber/min = (Volumen × Dråbefaktor) / (Tid i minutter)
```
**Eksempel:** (500 ml × 20 dråber/ml) / (4 timer × 60 min) = 42 dråber/min

**Dråbefaktorer:**
- 15 dråber/ml (grov dråbe)
- 20 dråber/ml (standard)
- 60 dråber/ml (mikrodråbe)

---

### E. Koncentrationsberegning (Fortynding)
```
C1 × V1 = C2 × V2

Volumen fra ampul = (Slutvolumen × Slutkoncentration) / Startkoncentration
Opløsningsvæske = Slutvolumen - Volumen fra ampul
```
**Eksempel:** 100 ml ved 2 mg/ml fra 10 mg/ml ampul
- Ampul: (100 × 2) / 10 = 20 ml
- Væske: 100 - 20 = 80 ml

---

### F. Vægtbaseret Dosering
```
Total dosis (mg) = Vægt (kg) × Dosis/kg (mg/kg)
Volumen (ml) = Total dosis (mg) / Styrke (mg/ml)
```
**Eksempel:** 15 kg × 10 mg/kg = 150 mg
- Ved 24 mg/ml: 150 mg / 24 mg/ml = 6,25 ml

---

### G. Kontinuerlig Infusion (Sprøjtepumpe)
```
Koncentration (mg/ml) = Lægemiddel (mg) / Volumen (ml)
Dosis/min = Dosis (µg/kg/min) × Vægt (kg)
Dosis/time = Dosis/min × 60
ml/time = Dosis/time (mg) / Koncentration (mg/ml)
```
**Eksempel:** Dobutamin 5 µg/kg/min, patient 70 kg, 250 mg i 50 ml
- Koncentration: 250/50 = 5 mg/ml
- Dosis/min: 5 × 70 = 350 µg/min
- Dosis/time: 350 × 60 = 21.000 µg = 21 mg
- ml/time: 21 / 5 = 4,2 ml/time

---

### H. Enhedskonvertering

#### Vægt
```
1 g = 1.000 mg
1 mg = 1.000 mikrogram (µg)
```

#### Volumen
```
1 l = 1.000 ml
```

#### Koncentration
```
1% = 10 mg/ml
```
**Eksempler:**
- 0,9% NaCl = 9 mg/ml
- 5% glucose = 50 mg/ml

#### Elektrolyt (mmol ↔ mg)
```
mg = mmol × Molarmasse
mmol = mg / Molarmasse
```
**Molarmasser:**
- Kalium (K): 39,1 g/mol
- Natrium (Na): 23,0 g/mol
- Calcium (Ca): 40,1 g/mol
- Magnesium (Mg): 24,3 g/mol

---

### I. Elektrolytberegning
```
Volumen (ml) = Ønsket mængde (mmol) / Koncentration (mmol/ml)
```
**Eksempel:** 40 mmol / 1 mmol/ml = 40 ml

**Sikkerhed:**
- Max kalium: 20 mmol/time
- Hvis > 20 mmol: Giv over minimum 2 timer

---

### J. Body Surface Area (BSA)
```
BSA (m²) = √((Vægt (kg) × Højde (cm)) / 3600)
```
**Eksempel:** √((70 × 175) / 3600) = 1,84 m²

**Typiske værdier:**
- Voksne: 1,5 - 2,0 m²
- Børn: 0,5 - 1,5 m²

---

## 🎯 Hurtig Tjekliste

### Før beregning:
- ☐ Har jeg de korrekte værdier?
- ☐ Er enhederne korrekte?
- ☐ Hvilken formel skal jeg bruge?

### Efter beregning:
- ☐ Er resultatet realistisk?
- ☐ Er dosis inden for normalområdet?
- ☐ Har jeg afrundet korrekt?
- ☐ Skal resultatet verificeres?

---

## ⚠️ Almindelige Fejl

### 1. Enheder
❌ **Forkert:** Blander mg og g
✅ **Korrekt:** Konverter altid til samme enhed først

### 2. Decimal separator
❌ **Forkert:** 3.5 ml (engelsk format)
✅ **Korrekt:** 3,5 ml (dansk format)

### 3. Fortynding
❌ **Forkert:** Glemmer at trække ampulvolumen fra
✅ **Korrekt:** Slutvolumen - Ampulvolumen = Opløsningsvæske

### 4. Vægtbaseret dosering
❌ **Forkert:** Glemmer at tjekke max dosis
✅ **Korrekt:** Sammenlign altid med max tilladt dosis

### 5. Kontinuerlig infusion
❌ **Forkert:** Glemmer at konvertere µg til mg
✅ **Korrekt:** 1 mg = 1.000 µg

---

## 📊 Normal Dosisområder (Reference)

### Paracetamol (børn)
- Oral: 10-15 mg/kg hver 4-6 time
- Max: 60 mg/kg/døgn

### Morfin (voksne)
- Oral: 5-20 mg hver 4 time
- IV: 2-10 mg hver 4 time

### Infusionshastigheder
- Vedligeholdsvæske: 80-120 ml/time (voksen)
- Blodtransfusion: 40-60 ml/time (start)

### Elektrolytter
- Kalium: Max 20 mmol/time
- Natrium: Normal serum 135-145 mmol/l

---

## 🔍 Sikkerhedskontrol

### Volumen
- Ampul: typisk 1-20 ml
- IM-injektion: max 3-5 ml
- SC-injektion: max 1-2 ml

### Infusionshastigheder
- Normal væske: 50-200 ml/time
- Dråber: 10-100 dråber/min

### BSA
- Voksen: 1,5-2,5 m²
- Under 0,5 m² eller over 3,0 m²: Kontroller input

---

**💡 Husk:** Dette er kun til træning. Verificer altid beregninger med autoriseret sundhedspersonale før reel brug!
