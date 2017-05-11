'use strict';

const TAX_TABLE_DATA = [
    {incomeFrom: 0, incomeTo: 18200, baseAmount: 0, amountToAddForEachDollar: 0, addAmountPerDollarAfterThisAmount: 0},
    {incomeFrom: 18201, incomeTo: 37000, baseAmount: 0, amountToAddForEachDollar: 0.19, addAmountPerDollarAfterThisAmount: 18200},
    {incomeFrom: 37001, incomeTo: 80000, baseAmount: 3572, amountToAddForEachDollar: 0.325, addAmountPerDollarAfterThisAmount: 37000},
    {incomeFrom: 80001, incomeTo: 180000, baseAmount: 17547, amountToAddForEachDollar: 0.37, addAmountPerDollarAfterThisAmount: 80000},
    {incomeFrom: 180001, incomeTo: 99999999999, baseAmount: 54547, amountToAddForEachDollar: 0.45, addAmountPerDollarAfterThisAmount: 180000}
]

module.exports.getMonthlyIncomeTaxForAnuualNetIncome = function (income) {
    for (let taxTableRow of TAX_TABLE_DATA) {
        if (income >= taxTableRow.incomeFrom && income <= taxTableRow.incomeTo) {
            return Math.round((taxTableRow.baseAmount + (income - taxTableRow.addAmountPerDollarAfterThisAmount) * taxTableRow.amountToAddForEachDollar) / 12);
        }
    }
    return 0;
}