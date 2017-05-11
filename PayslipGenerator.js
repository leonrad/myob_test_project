'use strict';

const Payslip = require('./Payslip.js');
const csv = require("fast-csv");
const fs = require("fs");


function PayslipGenerator() {
}
let lineNumber = 0;
PayslipGenerator.prototype.generatePayslipDataFromEmployeeData = function (employeeDataCsvInput, payslipDataCsvOutput, done) {
    lineNumber = 0;

    if (!fs.existsSync(employeeDataCsvInput)) {
        throw new Error("Cannot find input file '" + employeeDataCsvInput + "'.");
    }

    csv
        .fromPath(employeeDataCsvInput, {headers: false, trim: true, ignoreEmpty:true})
        .transform(function (csvLine) {
            return transformEmployeeDataArray(csvLine);
        })
        .validate(function (outputCsvLine) {
            return outputCsvLine.length == 7; // prevents a line being written if the output line doesn't contain the expected data
        })
        .pipe(csv.createWriteStream({headers: false, async: false}))
        .pipe(fs.createWriteStream(payslipDataCsvOutput, {encoding: "utf8"}))
        .on('finish', function () {
            console.log("Payslip data written to " + payslipDataCsvOutput);
            if (typeof done === "function") {
                done();
            }
        })

    ;
};

let transformEmployeeDataArray = function (employeeDataArray) {
    lineNumber = lineNumber + 1;
    if (!validateEmployeeDataArray(employeeDataArray)) {
        return [];
    }
    let payslip = convertCsvLineToPayslipObject(employeeDataArray);
    payslip.calculateAllValues();
    return extractPayslipOutputArrayFromPayslipObject(payslip);
};

let convertCsvLineToPayslipObject = function (employeeDataArray) {
    let firstNameStr = employeeDataArray[0];
    let lastNameStr = employeeDataArray[1];
    let annualSalaryStr = employeeDataArray[2];
    let superRateStr = employeeDataArray[3];
    let paymentPeriodStr = employeeDataArray[4];

    let annualSalary = parseInt(annualSalaryStr);
    let superRate = parseFloat(superRateStr) / 100.0;

    return new Payslip(firstNameStr, lastNameStr, annualSalary, superRate, paymentPeriodStr);
};

function validateEmployeeDataArray(employeeDataArray) {
    if (employeeDataArray == null || employeeDataArray.length == 0) {
        return false; // line is blank. don't process
    }

    if (employeeDataArray.length != 5) {
        displayError("line does not have the correct number of elements. Expected 5 elements: first name, last name, annual salary, super rate as percentage, payment period")
        return false;
    }

    let firstNameStr = employeeDataArray[0];
    let lastNameStr = employeeDataArray[1];
    let annualSalaryStr = employeeDataArray[2];
    let superRateStr = employeeDataArray[3];
    let paymentPeriodStr = employeeDataArray[4];

    if (emptyOrNull(firstNameStr)) {
        displayError("first name is not supplied");
        return false;
    }
    if (emptyOrNull(lastNameStr.trim())) {
        displayError("last name is not supplied");
        return false;
    }
    if (!isValidNumber(annualSalaryStr)) {
        displayError("annual salary is not a valid number");
        return false;
    }
    if (!isValidNumber(superRateStr)) {
        displayError("super rate is not a valid number");
        return false;
    }
    if (emptyOrNull(paymentPeriodStr)) {
        displayError("payment period is not supplied");
        return false;
    }

    return true;
}

function isValidNumber(number) {
    return number != null && number.trim() != '' && !isNaN(number);
}

function emptyOrNull(str) {
    return str == null || str.trim() == '';
}

function displayError(error) {
    console.error("error on line " + lineNumber + " : " + error);
}

let extractPayslipOutputArrayFromPayslipObject = function (payslip) {
    return [payslip.firstName, payslip.lastName, payslip.paymentPeriod, payslip.grossIncome, payslip.incomeTax, payslip.netIncome, payslip.super];
};

module.exports.PayslipGenerator = PayslipGenerator;

//export these for testing purposes
module.exports.transformEmployeeDataArray = transformEmployeeDataArray;
module.exports.convertCsvLineToPayslipObject = convertCsvLineToPayslipObject;
module.exports.extractPayslipOutputArrayFromPayslipObject = extractPayslipOutputArrayFromPayslipObject;

