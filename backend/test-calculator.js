/**
 * Test cases for Medicinregner
 * Kør med: node test-calculator.js
 */

const MedicineCalculator = require('./medicineCalculator');

class TestRunner {
  constructor() {
    this.passedTests = 0;
    this.failedTests = 0;
    this.calculator = new MedicineCalculator();
  }

  formatNumber(num, decimals = 2) {
    return Number(num).toFixed(decimals).replace('.', ',');
  }

  assertEqual(actual, expected, testName) {
    // Sammenlign med tolerance for floating point
    const tolerance = 0.01;
    const actualNum = typeof actual === 'string' ? parseFloat(actual.replace(',', '.')) : actual;
    const expectedNum = typeof expected === 'string' ? parseFloat(expected.replace(',', '.')) : expected;

    if (Math.abs(actualNum - expectedNum) < tolerance) {
      console.log(`✅ PASSED: ${testName}`);
      this.passedTests++;
    } else {
      console.log(`❌ FAILED: ${testName}`);
      console.log(`   Expected: ${expected}, Got: ${actual}`);
      this.failedTests++;
    }
  }

  assertContains(text, substring, testName) {
    if (text.includes(substring)) {
      console.log(`✅ PASSED: ${testName}`);
      this.passedTests++;
    } else {
      console.log(`❌ FAILED: ${testName}`);
      console.log(`   Expected to contain: ${substring}`);
      this.failedTests++;
    }
  }

  testAmpulBeregning() {
    console.log('\n📋 Test A: Ampulberegning');
    const result = this.calculator.ampulBeregning(75, 25);
    this.assertEqual(result.resultat, '3,00 ml', 'Ampul: 75mg / 25mg/ml = 3ml');
  }

  testToerstofBeregning() {
    console.log('\n📋 Test B: Tørstofberegning');
    const result = this.calculator.toerstofBeregning(500, 10);
    this.assertEqual(result.resultat, '50,00 ml væske tilsættes', 'Tørstof: 500mg ved 10mg/ml = 50ml');
  }

  testVaeskeBeregning() {
    console.log('\n📋 Test C: Væskeberegning');

    // Test med tid
    const result1 = this.calculator.vaeskeBeregning(1000, 8, null);
    this.assertEqual(result1.resultat, '125,00 ml/time', 'Væske: 1000ml / 8 timer = 125ml/time');

    // Test med hastighed
    const result2 = this.calculator.vaeskeBeregning(1000, null, 125);
    this.assertEqual(result2.resultat, '8,00 timer', 'Væske: 1000ml ved 125ml/time = 8 timer');
  }

  testDraabeHastighed() {
    console.log('\n📋 Test D: Dråbehastighed');
    const result = this.calculator.draabeHastighed(500, 4, 20);
    this.assertEqual(result.resultat, '42 dråber/min', 'Dråbe: 500ml over 4 timer ved 20 dråber/ml');
  }

  testKoncentrationBeregning() {
    console.log('\n📋 Test E: Koncentrationsberegning');
    const result = this.calculator.koncentrationBeregning(100, 2, 10);
    this.assertContains(result.resultat, '20,00 ml ampul', 'Koncentration: 20ml ampul');
    this.assertContains(result.resultat, '80,00 ml opløsningsvæske', 'Koncentration: 80ml væske');
  }

  testVaegtbaseretDosering() {
    console.log('\n📋 Test F: Vægtbaseret dosering');
    const result = this.calculator.vaegtbaseretDosering(15, 10, 24, 15);
    this.assertEqual(result.resultat, '6,25 ml', 'Vægtbaseret: 15kg × 10mg/kg ved 24mg/ml = 6,25ml');
  }

  testKontinuerligInfusion() {
    console.log('\n📋 Test G: Kontinuerlig infusion');
    const result = this.calculator.kontinuerligInfusion(5, 70, 250, 50);
    this.assertEqual(result.resultat, '4,20 ml/time', 'Kontinuerlig: Dobutamin 5µg/kg/min ved 70kg');
  }

  testEnhedsKonvertering() {
    console.log('\n📋 Test H: Enhedskonvertering');

    const result1 = this.calculator.enhedsKonvertering(2, 'g', 'mg');
    this.assertEqual(result1.resultat, '2000,00 mg', 'Konvertering: 2g = 2000mg');

    const result2 = this.calculator.enhedsKonvertering(1, '%', 'mg/ml');
    this.assertEqual(result2.resultat, '10,00 mg/ml', 'Konvertering: 1% = 10mg/ml');

    const result3 = this.calculator.enhedsKonvertering(1, 'l', 'ml');
    this.assertEqual(result3.resultat, '1000,00 ml', 'Konvertering: 1l = 1000ml');
  }

  testElektrolytBeregning() {
    console.log('\n📋 Test I: Elektrolytberegning');
    const result = this.calculator.elektrolytBeregning(40, 1);
    this.assertEqual(result.resultat, '40,00 ml', 'Elektrolyt: 40 mmol ved 1mmol/ml = 40ml');
    this.assertContains(result.kontrol, 'timer', 'Elektrolyt: Advarsel om infusionstid');
  }

  testBSA() {
    console.log('\n📋 Test J: Body Surface Area');
    const result = this.calculator.beregnBSA(70, 175);
    // BSA ≈ 1.85 m²
    const bsaValue = parseFloat(result.resultat.replace(',', '.'));
    if (bsaValue >= 1.80 && bsaValue <= 1.90) {
      console.log(`✅ PASSED: BSA beregning (${result.resultat})`);
      this.passedTests++;
    } else {
      console.log(`❌ FAILED: BSA beregning`);
      console.log(`   Expected: ~1.85 m², Got: ${result.resultat}`);
      this.failedTests++;
    }
  }

  testFormatOutput() {
    console.log('\n📋 Test: Output formatering');
    const result = this.calculator.ampulBeregning(75, 25);
    const formatted = this.calculator.formaterOutput(result);
    this.assertContains(formatted, '╔═══', 'Formateret output indeholder bokse');
    this.assertContains(formatted, 'RESULTAT', 'Formateret output indeholder resultat');
  }

  runAllTests() {
    console.log('🧪 Starter Medicinregner Tests\n');
    console.log('═══════════════════════════════════════════════════════════\n');

    this.testAmpulBeregning();
    this.testToerstofBeregning();
    this.testVaeskeBeregning();
    this.testDraabeHastighed();
    this.testKoncentrationBeregning();
    this.testVaegtbaseretDosering();
    this.testKontinuerligInfusion();
    this.testEnhedsKonvertering();
    this.testElektrolytBeregning();
    this.testBSA();
    this.testFormatOutput();

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`\n📊 Test Resultat:`);
    console.log(`   ✅ Passed: ${this.passedTests}`);
    console.log(`   ❌ Failed: ${this.failedTests}`);
    console.log(`   📈 Total:  ${this.passedTests + this.failedTests}`);

    if (this.failedTests === 0) {
      console.log('\n🎉 Alle tests bestået!\n');
    } else {
      console.log(`\n⚠️  ${this.failedTests} test(s) fejlede\n`);
      process.exit(1);
    }
  }
}

// Kør tests
const runner = new TestRunner();
runner.runAllTests();
