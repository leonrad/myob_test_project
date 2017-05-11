Payslip processor for MYOB programming exercise.

Reads a CSV file with employee data and produces a CSV with payslip data.

Author : Leonard Hagger

Usage :

   node main.js <inputCsv> <outputCsv>

The format of the input CSV is as follows:
First Name, Last Name, Annual Salary, Super Rate, Payment Period

e.g.
Sarah,Conner,150123,6,1 September - 30 September
Kyle,Reese,100123,8,1 September - 30 September

The format of the output CSV is as follows:
First Name, Last Name, Payment Period, Gross Income, Income Tax, Net Income, Super

e.g.
Sarah,Conner,1 September - 30 September,12510,3624,8886,751
Kyle,Reese,1 September - 30 September,8344,2083,6261,668

Run the unit tests by entering
   npm test
