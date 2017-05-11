var assert = require('assert');
const TaxTable = require('../TaxTable.js');

describe('TaxTable', function () {
    describe('#getMonthlyIncomeTaxForAnuualNetIncome()', function () {


        it('get correct tax rate for 10,000', function () {
            monthlyIncomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(10000);
            assert.equal(0, monthlyIncomeTax);
        });

        it('get correct tax rate for 20,123', function () {
            monthlyIncomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(20123);
            assert.equal(30, monthlyIncomeTax);
        });

        it('get correct tax rate for 37,001', function () {
            monthlyIncomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(37000);
            assert.equal(298, monthlyIncomeTax);
        });

        it('get correct tax rate for 60,050', function () {
            monthlyIncomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(20123);
            assert.equal(30, monthlyIncomeTax);
        });

        it('get correct tax rate for 100,000', function () {
            monthlyIncomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(100000);
            assert.equal(2079, monthlyIncomeTax);
        });

        it('get correct tax rate for 200,000', function () {
            monthlyIncomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(200000);
            assert.equal(5296, monthlyIncomeTax);
        });

        it('get correct tax rate for -1', function () {
            monthlyIncomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(-1);
            assert.equal(0, monthlyIncomeTax);
        });
    });
});