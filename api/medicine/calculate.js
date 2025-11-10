/**
 * Vercel Serverless Function for Medicine Calculator
 */

// Import the calculator class
const MedicineCalculator = require('../../backend/medicineCalculator');

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const calculator = new MedicineCalculator();
    let result;

    switch (data.type) {
      case 'ampul':
        result = calculator.ampulBeregning(data.dosis, data.styrke);
        break;
      case 'toerstof':
        result = calculator.toerstofBeregning(data.toerstofMaengde, data.oensketKoncentration);
        break;
      case 'vaeske':
        result = calculator.vaeskeBeregning(data.volumen, data.tid, data.hastighed);
        break;
      case 'draabe':
        result = calculator.draabeHastighed(data.volumen, data.tidTimer, data.draabeFaktor);
        break;
      case 'koncentration':
        result = calculator.koncentrationBeregning(data.slutVolumen, data.slutKoncentration, data.startKoncentration);
        break;
      case 'vaegtbaseret':
        result = calculator.vaegtbaseretDosering(data.vaegt, data.dosisPerKg, data.praeparatStyrke, data.maxDosisPerKg);
        break;
      case 'kontinuerlig':
        result = calculator.kontinuerligInfusion(data.dosisMikrogramPerKgPerMin, data.vaegt, data.maengdeMg, data.volumenMl);
        break;
      case 'enhedskonvertering':
        result = calculator.enhedsKonvertering(data.vaerdi, data.fraEnhed, data.tilEnhed, data.molarmasse);
        break;
      case 'elektrolyt':
        result = calculator.elektrolytBeregning(data.mmolOensket, data.mmolPerMl);
        break;
      case 'bsa':
        result = calculator.beregnBSA(data.vaegt, data.hoejde);
        break;
      default:
        return res.status(400).json({ error: 'Ukendt beregningstype' });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
