'use strict';

const TaxTable = require('./TaxTable.js');

function Payslip(firstName, lastName, annualSalary, superRate, paymentPeriod) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.annualSalary = annualSalary;
    this.superRate = superRate;
    this.paymentPeriod = paymentPeriod;

    this.grossIncome = 0;
    this.incomeTax = 0;
    this.netIncome = 0;
    this.super = 0;
}

Payslip.prototype.calculateAllValues = function() {
    this.calculateGrossIncome()
        .calculateIncomeTax()
        .calculateNetIncome()
        .calculateSuper();
};

Payslip.prototype.calculateGrossIncome = function() {
    this.grossIncome = Math.round(this.annualSalary / 12);
    return this;
};

Payslip.prototype.calculateIncomeTax = function() {
    this.incomeTax = TaxTable.getMonthlyIncomeTaxForAnuualNetIncome(this.annualSalary) ;
    return this;
};

Payslip.prototype.calculateNetIncome = function() {
    this.netIncome = this.grossIncome - this.incomeTax;
    return this;
};

Payslip.prototype.calculateSuper = function() {
    this.super =  Math.round(this.grossIncome * this.superRate);
    return this;
};

module.exports = Payslip;