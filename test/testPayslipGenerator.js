var assert = require('assert');
const PayslipGenerator = require('../PayslipGenerator.js');
const Payslip = require('../Payslip.js');
const fs = require("fs");

describe('PayslipGenerator', function () {
    describe('#convertCsvLineToPayslipObject()', function () {
        before(function () {
            if (fs.existsSync(__dirname + '/testOutput.csv')) {
                fs.unlinkSync(__dirname + '/testOutput.csv');
            }
        });
        it('should process an input file and produce payslip data', function (done) {
            let payslipGenerator = new PayslipGenerator.PayslipGenerator();
            payslipGenerator.generatePayslipDataFromEmployeeData(
                __dirname + '/testInput.csv',
                __dirname + '/testOutput.csv',
                function () {
                    let content = fs.readFileSync(__dirname + '/testOutput.csv', 'utf8');
                    let lines = content.split(/\r?\n/);
                    assert.equal(lines[0], 'David,Rudd,01 March - 31 March,5004,922,4082,450');
                    assert.equal(lines[1], 'Ryan,Chen,01 March - 31 March,10000,2696,7304,1000');
                    assert.equal(lines[2], 'John,Smith,01 June - 30 June,10000,2696,7304,1000');

                    done();
                });
        });
        after(function () {
            if (fs.existsSync(__dirname + '/testOutput.csv')) {
                fs.unlinkSync(__dirname + '/testOutput.csv');
            }
        });
    });

    describe('#convertCsvLineToPayslipObject()', function () {
        it('should give error when it cannot find the input file', function () {
            let payslipGenerator = new PayslipGenerator.PayslipGenerator();
            assert.throws(function () {
                    payslipGenerator.generatePayslipDataFromEmployeeData(
                        'something that does not exist',
                        __dirname + '/testOutput.csv')
                },
                Error, 'Cannot find input file \'something that does not exist\'.');
        });
    });

    describe('#convertCsvLineToPayslipObject()', function () {
        it('should convert an array of values into a Payslip object ready for processing', function () {
            let payslip = PayslipGenerator.convertCsvLineToPayslipObject(['David', 'Rudd', '60050', '9', '01 March - 31 March']);
            assert.equal('David', payslip.firstName);
            assert.equal('Rudd', payslip.lastName);
            assert.equal(60050, payslip.annualSalary);
            assert.equal(0.09, payslip.superRate);
            assert.equal('01 March - 31 March', payslip.paymentPeriod);
        });
    });

    describe('#extractPayslipOutputArrayFromPayslipObject()', function () {
        it('should extract an array of payslip data from a payslip object', function () {
            let payslip = new Payslip('David', 'Rudd', 60050, 0.09, '01 March - 31 March');
            payslip.grossIncome = 10002;
            payslip.incomeTax = 2696;
            payslip.netIncome = 7306;
            payslip.super = 5001;

            let payslipDataArray = PayslipGenerator.extractPayslipOutputArrayFromPayslipObject(payslip);
            assert.equal(payslipDataArray[0], 'David');
            assert.equal(payslipDataArray[1], 'Rudd');
            assert.equal(payslipDataArray[2], '01 March - 31 March');
            assert.equal(payslipDataArray[3], '10002');
            assert.equal(payslipDataArray[4], '2696');
            assert.equal(payslipDataArray[5], '7306');
            assert.equal(payslipDataArray[6], '5001');
        });
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should correctly transform valid employee input data array to payslip output data', function () {
            let employeeInputData = ['Bob', 'Hope', '123456', '5.5', '1 May to 30 May'];

            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);

            assert.equal(payslipDataArray[0], 'Bob');
            assert.equal(payslipDataArray[1], 'Hope');
            assert.equal(payslipDataArray[2], '1 May to 30 May');
            assert.equal(payslipDataArray[3], 10288);
            assert.equal(payslipDataArray[4], 2802);
            assert.equal(payslipDataArray[5], 7486);
            assert.equal(payslipDataArray[6], 566);
        })
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should return empty array when given empty array', function () {
            let employeeInputData = [];
            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);
            assert.equal(payslipDataArray.length, 0);
        })
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should return empty array when first name not specified', function () {
            let employeeInputData = [, 'Hope', '123456', '5.5', '1 May to 30 May'];
            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);
            assert.equal(payslipDataArray.length, 0);
        })
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should return empty array when last name not specified', function () {
            let employeeInputData = ['Bob', '', '123456', '5.5', '1 May to 30 May'];
            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);
            assert.equal(payslipDataArray.length, 0);
        })
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should return empty array when annual salary not provided', function () {
            let employeeInputData = ['Bob', 'Hope', , '5.5', '1 May to 30 May'];
            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);
            assert.equal(payslipDataArray.length, 0);
        })
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should return empty array when annual salary not a number ', function () {
            let employeeInputData = ['Bob', 'Hope', '', '5.5', '1 May to 30 May'];
            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);
            assert.equal(payslipDataArray.length, 0);
        })
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should return empty array when super rate not a number', function () {
            let employeeInputData = ['Bob', 'Hope', '123456', 'asdf', '1 May to 30 May'];
            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);
            assert.equal(payslipDataArray.length, 0);
        })
    });

    describe('#transformEmployeeDataArray()', function () {
        it('should return empty array when payment period not specified', function () {
            let employeeInputData = ['Bob', 'Hope', '123456', '5.5', ''];
            payslipDataArray = PayslipGenerator.transformEmployeeDataArray(employeeInputData);
            assert.equal(payslipDataArray.length, 0);
        })
    });
});