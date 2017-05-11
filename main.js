const PayslipGenerator = require('./PayslipGenerator.js');
const fs = require("fs");

var inputCsvFile = process.argv[2];
var outputCsvFile = process.argv[3];

if (inputCsvFile == null || inputCsvFile.trim() == '') {
    console.error("Please specify path to employee detail csv file. Usage: node main.js \<pathToEmpolyeeDetailCsvFile\> \<pathToPayslipOutputFile\>");
    process.exit(1);
}
if (!fs.existsSync(inputCsvFile)) {
    console.error("Cannot find input file '" + inputCsvFile + "'.");
    process.exit(1);
}

if (!outputCsvFile) {
    console.error("Please specify file where you would like to write the payslip data to. Usage: node main.js \<pathToEmpolyeeDetailCsvFile\> \<pathToPayslipOutputFile\>");
    process.exit(1);
}

let payslipGenerator = new PayslipGenerator.PayslipGenerator();
payslipGenerator.generatePayslipDataFromEmployeeData(inputCsvFile, outputCsvFile);

