var assert = require('assert');
const Payslip = require('../Payslip.js');

describe('Payslip', function () {
    describe('#calculateGrossIncome()', function () {
        it('should calculate all fields correctly', function () {
            var payslip = new Payslip('John', 'Smith', 120019, 0.5, 'March 01 - March 31');

            payslip.calculateAllValues();

            assert.equal(10002, payslip.grossIncome);
            assert.equal(2696, payslip.incomeTax);
            assert.equal(7306, payslip.netIncome);
            assert.equal(5001, payslip.super);
        });
    });
});
