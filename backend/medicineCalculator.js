/**
 * AI Studie Hjælper - Medicinregner for Sygeplejestuderende
 *
 * En professionel medicinregner tilsvarende systemer på danske hospitaler
 */

class MedicineCalculator {

  /**
   * Formaterer tal til dansk format med komma som decimalseparator
   */
  formatNumber(num, decimals = 2) {
    return Number(num).toFixed(decimals).replace('.', ',');
  }

  /**
   * A. Ampulberegning
   * Beregner hvor meget ml der skal trækkes op fra ampul
   * @param {number} dosis - Ordineret dosis i mg
   * @param {number} styrke - Ampulstyrke i mg/ml
   */
  ampulBeregning(dosis, styrke) {
    const volumen = dosis / styrke;
    const realistisk = volumen > 0 && volumen <= 20; // Typisk max 20ml fra en ampul

    return {
      beregningstype: 'Ampulberegning',
      givneVaerdier: {
        dosis: `${this.formatNumber(dosis, 0)} mg`,
        styrke: `${this.formatNumber(styrke)} mg/ml`
      },
      formel: 'Dosis / styrke = volumen',
      beregning: `${this.formatNumber(dosis, 0)} mg / ${this.formatNumber(styrke)} mg/ml = ${this.formatNumber(volumen)} ml`,
      resultat: `${this.formatNumber(volumen)} ml`,
      kontrol: realistisk ? 'Realistisk volumen → ja' : 'Usædvanligt stort volumen → kontroller'
    };
  }

  /**
   * B. Tørstofberegning
   * Beregner hvor meget væske der skal tilsættes tørstof
   * @param {number} toerstofMaengde - Mængde tørstof i mg
   * @param {number} oensketKoncentration - Ønsket koncentration i mg/ml
   */
  toerstofBeregning(toerstofMaengde, oensketKoncentration) {
    const vaeskeMl = toerstofMaengde / oensketKoncentration;
    const realistisk = vaeskeMl > 0 && vaeskeMl <= 1000;

    return {
      beregningstype: 'Tørstofberegning',
      givneVaerdier: {
        toerstof: `${this.formatNumber(toerstofMaengde, 0)} mg`,
        oensketKoncentration: `${this.formatNumber(oensketKoncentration)} mg/ml`
      },
      formel: 'Tørstofmængde / ønsket koncentration = ml væske',
      beregning: `${this.formatNumber(toerstofMaengde, 0)} mg / ${this.formatNumber(oensketKoncentration)} mg/ml = ${this.formatNumber(vaeskeMl)} ml`,
      resultat: `${this.formatNumber(vaeskeMl)} ml væske tilsættes`,
      kontrol: realistisk ? 'Realistisk volumen → ja' : 'Meget stort volumen → kontroller'
    };
  }

  /**
   * C. Væskeberegning (infusion)
   * Beregner ml/time eller infusionstid
   * @param {number} volumen - Volumen i ml
   * @param {number} tid - Tid i timer (null hvis hastighed er givet)
   * @param {number} hastighed - Hastighed i ml/time (null hvis tid er givet)
   */
  vaeskeBeregning(volumen, tid = null, hastighed = null) {
    let resultatHastighed, resultatTid, beregning;

    if (tid !== null) {
      resultatHastighed = volumen / tid;
      beregning = `${this.formatNumber(volumen, 0)} ml / ${this.formatNumber(tid)} timer = ${this.formatNumber(resultatHastighed)} ml/time`;
      const realistisk = resultatHastighed > 0 && resultatHastighed <= 999;

      return {
        beregningstype: 'Væskeberegning (infusion)',
        givneVaerdier: {
          volumen: `${this.formatNumber(volumen, 0)} ml`,
          tid: `${this.formatNumber(tid)} timer`
        },
        formel: 'Volumen / tid = hastighed',
        beregning,
        resultat: `${this.formatNumber(resultatHastighed)} ml/time`,
        kontrol: realistisk ? 'Normal infusionshastighed → ja' : 'Usædvanlig hastighed → kontroller'
      };
    } else if (hastighed !== null) {
      resultatTid = volumen / hastighed;
      beregning = `${this.formatNumber(volumen, 0)} ml / ${this.formatNumber(hastighed)} ml/time = ${this.formatNumber(resultatTid)} timer`;
      const realistisk = resultatTid > 0 && resultatTid <= 24;

      return {
        beregningstype: 'Væskeberegning (infusionstid)',
        givneVaerdier: {
          volumen: `${this.formatNumber(volumen, 0)} ml`,
          hastighed: `${this.formatNumber(hastighed)} ml/time`
        },
        formel: 'Volumen / hastighed = tid',
        beregning,
        resultat: `${this.formatNumber(resultatTid)} timer`,
        kontrol: realistisk ? 'Realistisk varighed → ja' : 'Meget lang infusion → kontroller'
      };
    }

    throw new Error('Angiv enten tid eller hastighed');
  }

  /**
   * D. Dråbehastighed
   * Beregner dråber/min baseret på dråbefaktor
   * @param {number} volumen - Volumen i ml
   * @param {number} tidTimer - Tid i timer
   * @param {number} draabeFaktor - Dråbefaktor (15, 20 eller 60 dråber/ml)
   */
  draabeHastighed(volumen, tidTimer, draabeFaktor) {
    const totalDraaber = volumen * draabeFaktor;
    const tidMin = tidTimer * 60;
    const draaberPerMin = totalDraaber / tidMin;
    const afrundet = Math.round(draaberPerMin);
    const realistisk = afrundet > 0 && afrundet <= 200;

    return {
      beregningstype: 'Dråbehastighed',
      givneVaerdier: {
        volumen: `${this.formatNumber(volumen, 0)} ml`,
        tid: `${this.formatNumber(tidTimer)} timer`,
        draabeFaktor: `${draabeFaktor} dråber/ml`
      },
      formel: '(Volumen × dråbefaktor) / (tid i min) = dråber/min',
      beregning: [
        `Total dråber: ${this.formatNumber(volumen, 0)} ml × ${draabeFaktor} = ${this.formatNumber(totalDraaber, 0)} dråber`,
        `Tid: ${this.formatNumber(tidTimer)} timer × 60 = ${this.formatNumber(tidMin, 0)} min`,
        `Dråber/min: ${this.formatNumber(totalDraaber, 0)} / ${this.formatNumber(tidMin, 0)} = ${this.formatNumber(draaberPerMin)} ≈ ${afrundet} dråber/min`
      ].join('\n'),
      resultat: `${afrundet} dråber/min`,
      kontrol: realistisk ? 'Passende hastighed → ja' : 'Usædvanlig hastighed → kontroller'
    };
  }

  /**
   * E. Koncentrationsberegning / Fortynding
   * Beregner fortynding/blanding (C1×V1 = C2×V2)
   * @param {number} slutVolumen - Ønsket slutvolumen i ml
   * @param {number} slutKoncentration - Ønsket koncentration i mg/ml
   * @param {number} startKoncentration - Start koncentration i mg/ml
   */
  koncentrationBeregning(slutVolumen, slutKoncentration, startKoncentration) {
    const oensketIndhold = slutVolumen * slutKoncentration;
    const volumenFraAmpul = oensketIndhold / startKoncentration;
    const oploesningsVaeske = slutVolumen - volumenFraAmpul;
    const realistisk = volumenFraAmpul > 0 && volumenFraAmpul <= slutVolumen;

    return {
      beregningstype: 'Koncentration/fortynding',
      givneVaerdier: {
        slutvolumen: `${this.formatNumber(slutVolumen, 0)} ml`,
        slutkoncentration: `${this.formatNumber(slutKoncentration)} mg/ml`,
        startkoncentration: `${this.formatNumber(startKoncentration)} mg/ml`
      },
      formel: 'C1×V1 = C2×V2',
      beregning: [
        `Ønsket indhold: ${this.formatNumber(slutVolumen, 0)} ml × ${this.formatNumber(slutKoncentration)} mg/ml = ${this.formatNumber(oensketIndhold, 0)} mg`,
        `Volumen fra ampul: ${this.formatNumber(oensketIndhold, 0)} mg / ${this.formatNumber(startKoncentration)} mg/ml = ${this.formatNumber(volumenFraAmpul)} ml`,
        `Opløsningsvæske: ${this.formatNumber(slutVolumen, 0)} ml - ${this.formatNumber(volumenFraAmpul)} ml = ${this.formatNumber(oploesningsVaeske)} ml`
      ].join('\n'),
      resultat: `${this.formatNumber(volumenFraAmpul)} ml ampul + ${this.formatNumber(oploesningsVaeske)} ml opløsningsvæske`,
      kontrol: realistisk ? `Slutvolumen ${this.formatNumber(slutVolumen, 0)} ml, koncentration ${this.formatNumber(slutKoncentration)} mg/ml → korrekt` : 'Kontroller beregning'
    };
  }

  /**
   * F. Vægtbaseret dosering
   * Beregner dosis baseret på vægt
   * @param {number} vaegt - Patientens vægt i kg
   * @param {number} dosisPerKg - Dosis pr. kg (mg/kg)
   * @param {number} praeparatStyrke - Præparatstyrke i mg/ml
   * @param {number} maxDosisPerKg - Max tilladt dosis pr. kg (valgfri)
   */
  vaegtbaseretDosering(vaegt, dosisPerKg, praeparatStyrke, maxDosisPerKg = null) {
    const totalDosis = vaegt * dosisPerKg;
    const volumen = totalDosis / praeparatStyrke;
    let kontrol = 'Realistisk dosis → ja';

    if (maxDosisPerKg && dosisPerKg > maxDosisPerKg) {
      kontrol = `ADVARSEL: Overskrider max dosis (${this.formatNumber(maxDosisPerKg)} mg/kg)`;
    }

    return {
      beregningstype: 'Vægtbaseret dosering',
      givneVaerdier: {
        vaegt: `${this.formatNumber(vaegt)} kg`,
        dosisPerKg: `${this.formatNumber(dosisPerKg)} mg/kg`,
        styrke: `${this.formatNumber(praeparatStyrke)} mg/ml`
      },
      formel: '(Vægt × dosis/kg) / styrke = volumen',
      beregning: [
        `Total dosis: ${this.formatNumber(vaegt)} kg × ${this.formatNumber(dosisPerKg)} mg/kg = ${this.formatNumber(totalDosis, 0)} mg`,
        `Volumen: ${this.formatNumber(totalDosis, 0)} mg / ${this.formatNumber(praeparatStyrke)} mg/ml = ${this.formatNumber(volumen)} ml`
      ].join('\n'),
      resultat: `${this.formatNumber(volumen)} ml`,
      kontrol
    };
  }

  /**
   * G. Kontinuerlig infusion (sprøjtepumpe)
   * Beregner ml/time for sprøjtepumpe
   * @param {number} dosisMikrogramPerKgPerMin - Dosis i mikrogram/kg/min
   * @param {number} vaegt - Patientens vægt i kg
   * @param {number} maengdeMg - Lægemiddelmængde i sprøjte (mg)
   * @param {number} volumenMl - Volumen i sprøjte (ml)
   */
  kontinuerligInfusion(dosisMikrogramPerKgPerMin, vaegt, maengdeMg, volumenMl) {
    const koncentrationMgPerMl = maengdeMg / volumenMl;
    const koncentrationMikrogramPerMl = koncentrationMgPerMl * 1000;
    const dosisPerMin = dosisMikrogramPerKgPerMin * vaegt;
    const dosisPerTime = dosisPerMin * 60;
    const dosisMgPerTime = dosisPerTime / 1000;
    const mlPerTime = dosisMgPerTime / koncentrationMgPerMl;
    const realistisk = mlPerTime > 0 && mlPerTime <= 50;

    return {
      beregningstype: 'Kontinuerlig infusion (sprøjtepumpe)',
      givneVaerdier: {
        dosis: `${this.formatNumber(dosisMikrogramPerKgPerMin)} mikrogram/kg/min`,
        vaegt: `${this.formatNumber(vaegt)} kg`,
        sproejteMaengde: `${this.formatNumber(maengdeMg, 0)} mg i ${this.formatNumber(volumenMl, 0)} ml`
      },
      formel: '(Dosis × vægt × 60) / koncentration = ml/time',
      beregning: [
        `Koncentration: ${this.formatNumber(maengdeMg, 0)} mg / ${this.formatNumber(volumenMl, 0)} ml = ${this.formatNumber(koncentrationMgPerMl)} mg/ml = ${this.formatNumber(koncentrationMikrogramPerMl, 0)} mikrogram/ml`,
        `Dosis/min: ${this.formatNumber(dosisMikrogramPerKgPerMin)} mikrogram/kg/min × ${this.formatNumber(vaegt)} kg = ${this.formatNumber(dosisPerMin, 0)} mikrogram/min`,
        `Dosis/time: ${this.formatNumber(dosisPerMin, 0)} mikrogram/min × 60 = ${this.formatNumber(dosisPerTime, 0)} mikrogram/time = ${this.formatNumber(dosisMgPerTime)} mg/time`,
        `ml/time: ${this.formatNumber(dosisMgPerTime)} mg/time / ${this.formatNumber(koncentrationMgPerMl)} mg/ml = ${this.formatNumber(mlPerTime)} ml/time`
      ].join('\n'),
      resultat: `${this.formatNumber(mlPerTime)} ml/time`,
      kontrol: realistisk ? 'Typisk infusionshastighed → ja' : 'Usædvanlig hastighed → kontroller'
    };
  }

  /**
   * H. Enhedskonvertering
   * Konverterer mellem forskellige enheder
   * @param {number} vaerdi - Værdi der skal konverteres
   * @param {string} fraEnhed - Fra enhed (mg, g, mikrogram, ml, l, %)
   * @param {string} tilEnhed - Til enhed
   * @param {number} molarmasse - Molarmasse (kun for mmol konverteringer)
   */
  enhedsKonvertering(vaerdi, fraEnhed, tilEnhed, molarmasse = null) {
    let resultat;
    let formel = '';
    let beregning = '';

    // Vægt konverteringer
    if (fraEnhed === 'g' && tilEnhed === 'mg') {
      resultat = vaerdi * 1000;
      formel = 'g × 1000 = mg';
      beregning = `${this.formatNumber(vaerdi)} g × 1000 = ${this.formatNumber(resultat, 0)} mg`;
    } else if (fraEnhed === 'mg' && tilEnhed === 'g') {
      resultat = vaerdi / 1000;
      formel = 'mg / 1000 = g';
      beregning = `${this.formatNumber(vaerdi)} mg / 1000 = ${this.formatNumber(resultat)} g`;
    } else if (fraEnhed === 'mg' && tilEnhed === 'mikrogram') {
      resultat = vaerdi * 1000;
      formel = 'mg × 1000 = mikrogram';
      beregning = `${this.formatNumber(vaerdi)} mg × 1000 = ${this.formatNumber(resultat, 0)} mikrogram`;
    } else if (fraEnhed === 'mikrogram' && tilEnhed === 'mg') {
      resultat = vaerdi / 1000;
      formel = 'mikrogram / 1000 = mg';
      beregning = `${this.formatNumber(vaerdi)} mikrogram / 1000 = ${this.formatNumber(resultat)} mg`;
    }
    // Volumen konverteringer
    else if (fraEnhed === 'l' && tilEnhed === 'ml') {
      resultat = vaerdi * 1000;
      formel = 'l × 1000 = ml';
      beregning = `${this.formatNumber(vaerdi)} l × 1000 = ${this.formatNumber(resultat, 0)} ml`;
    } else if (fraEnhed === 'ml' && tilEnhed === 'l') {
      resultat = vaerdi / 1000;
      formel = 'ml / 1000 = l';
      beregning = `${this.formatNumber(vaerdi)} ml / 1000 = ${this.formatNumber(resultat)} l`;
    }
    // Procent til mg/ml (1% = 10 mg/ml)
    else if (fraEnhed === '%' && tilEnhed === 'mg/ml') {
      resultat = vaerdi * 10;
      formel = '% × 10 = mg/ml';
      beregning = `${this.formatNumber(vaerdi)}% × 10 = ${this.formatNumber(resultat)} mg/ml`;
    } else if (fraEnhed === 'mg/ml' && tilEnhed === '%') {
      resultat = vaerdi / 10;
      formel = 'mg/ml / 10 = %';
      beregning = `${this.formatNumber(vaerdi)} mg/ml / 10 = ${this.formatNumber(resultat)}%`;
    }
    // mmol konverteringer (kræver molarmasse)
    else if (fraEnhed === 'mmol' && tilEnhed === 'mg' && molarmasse) {
      resultat = vaerdi * molarmasse;
      formel = 'mmol × molarmasse = mg';
      beregning = `${this.formatNumber(vaerdi)} mmol × ${this.formatNumber(molarmasse)} = ${this.formatNumber(resultat)} mg`;
    } else if (fraEnhed === 'mg' && tilEnhed === 'mmol' && molarmasse) {
      resultat = vaerdi / molarmasse;
      formel = 'mg / molarmasse = mmol';
      beregning = `${this.formatNumber(vaerdi)} mg / ${this.formatNumber(molarmasse)} = ${this.formatNumber(resultat)} mmol`;
    } else {
      throw new Error(`Kan ikke konvertere fra ${fraEnhed} til ${tilEnhed}`);
    }

    return {
      beregningstype: 'Enhedskonvertering',
      givneVaerdier: {
        vaerdi: `${this.formatNumber(vaerdi)} ${fraEnhed}`,
        konverterTil: tilEnhed
      },
      formel,
      beregning,
      resultat: `${this.formatNumber(resultat)} ${tilEnhed}`,
      kontrol: 'Korrekt konvertering → ja'
    };
  }

  /**
   * I. Elektrolytberegning
   * Beregner elektrolytmængder
   * @param {number} mmolOensket - Ønsket mængde i mmol
   * @param {number} mmolPerMl - Koncentration i mmol/ml
   */
  elektrolytBeregning(mmolOensket, mmolPerMl) {
    const ml = mmolOensket / mmolPerMl;
    const maxPerTime = 20; // Typisk max 20 mmol/time for kalium
    const minTimer = mmolOensket / maxPerTime;
    const kontrol = mmolOensket > maxPerTime ?
      `Max ${maxPerTime} mmol/time → giv over min. ${this.formatNumber(minTimer)} timer` :
      'Acceptabel mængde → ja';

    return {
      beregningstype: 'Elektrolytberegning',
      givneVaerdier: {
        oensketMaengde: `${this.formatNumber(mmolOensket, 0)} mmol`,
        koncentration: `${this.formatNumber(mmolPerMl)} mmol/ml`
      },
      formel: 'mmol / (mmol/ml) = ml',
      beregning: `${this.formatNumber(mmolOensket, 0)} mmol / ${this.formatNumber(mmolPerMl)} mmol/ml = ${this.formatNumber(ml)} ml`,
      resultat: `${this.formatNumber(ml)} ml`,
      kontrol
    };
  }

  /**
   * J. Body Surface Area (BSA) - Mosteller formel
   * @param {number} vaegt - Vægt i kg
   * @param {number} hoejde - Højde i cm
   */
  beregnBSA(vaegt, hoejde) {
    const bsa = Math.sqrt((vaegt * hoejde) / 3600);
    const realistisk = bsa > 0.5 && bsa < 3.0;

    return {
      beregningstype: 'Body Surface Area (BSA)',
      givneVaerdier: {
        vaegt: `${this.formatNumber(vaegt)} kg`,
        hoejde: `${this.formatNumber(hoejde, 0)} cm`
      },
      formel: 'BSA (m²) = √((vægt × højde) / 3600)',
      beregning: `BSA = √((${this.formatNumber(vaegt)} kg × ${this.formatNumber(hoejde, 0)} cm) / 3600) = ${this.formatNumber(bsa)} m²`,
      resultat: `${this.formatNumber(bsa)} m²`,
      kontrol: realistisk ? 'Normal BSA → ja' : 'Usædvanlig BSA → kontroller input'
    };
  }

  /**
   * Formaterer output til læsbar tekst
   */
  formaterOutput(resultat) {
    const lines = [
      '╔═══════════════════════════════════════════════════════════╗',
      `║ BEREGNINGSTYPE: ${resultat.beregningstype}`,
      '╠═══════════════════════════════════════════════════════════╣',
      '║ GIVNE VÆRDIER:',
    ];

    for (const [key, value] of Object.entries(resultat.givneVaerdier)) {
      lines.push(`║   ${key}: ${value}`);
    }

    lines.push('╠═══════════════════════════════════════════════════════════╣');
    lines.push(`║ FORMEL: ${resultat.formel}`);
    lines.push('╠═══════════════════════════════════════════════════════════╣');
    lines.push('║ BEREGNING:');

    const beregningLines = resultat.beregning.split('\n');
    beregningLines.forEach(line => {
      lines.push(`║   ${line}`);
    });

    lines.push('╠═══════════════════════════════════════════════════════════╣');
    lines.push(`║ ✅ RESULTAT: ${resultat.resultat}`);
    lines.push('╠═══════════════════════════════════════════════════════════╣');
    lines.push(`║ KONTROL: ${resultat.kontrol}`);
    lines.push('╚═══════════════════════════════════════════════════════════╝');

    return lines.join('\n');
  }
}

module.exports = MedicineCalculator;
