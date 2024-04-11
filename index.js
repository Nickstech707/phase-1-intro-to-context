// Function to create an employee record from a row of data
let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

// Function to create employee records from an array of employee data
let createEmployeeRecords = function (employeeRowData) {
  return employeeRowData.map(function (row) {
    return createEmployeeRecord(row);
  });
};

// Function to log a time in event for an employee
const createTimeInEvent = (employee, dateStamp) => {
  const [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

// Function to log a time out event for an employee
let createTimeOutEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

// Function to calculate hours worked by an employee on a specific date
let hoursWorkedOnDate = function (employee, soughtDate) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === soughtDate;
  });

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === soughtDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

// Function to calculate wages earned by an employee on a specific date
let wagesEarnedOnDate = function (employee, dateSought) {
  let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
  return parseFloat(rawWage.toString());
};

// Function to calculate total wages earned by an employee
let allWagesFor = function (employee) {
  let eligibleDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
};

// Function to find an employee by first name in an array of employee records
let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName;
  });
};

// Function to calculate the total payroll for an array of employee records
let calculatePayroll = function (arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
};
