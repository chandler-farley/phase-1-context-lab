/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
}

const createTimeInEvent = function(timeIn) {
    let time = {
        type: "TimeIn",
        hour: parseInt(timeIn.split(" ")[1]),
        date: timeIn.split(" ")[0]
    }
    this.timeInEvents.push(time)
    return this
}

const createTimeOutEvent = function(timeOut) {
    let time = {
        type: "TimeOut",
        hour: parseInt(timeOut.split(" ")[1]),
        date: timeOut.split(" ")[0]
    }
    this.timeOutEvents.push(time)
    return this
}

const hoursWorkedOnDate = function(date) {
    let timeInHour = this.timeInEvents.filter(obj => obj.date === date).map(ele => ele.hour)
    let timeOutHour = this.timeOutEvents.filter(obj => obj.date === date).map(ele => ele.hour)
    let hoursWorked = timeOutHour.map((value, i) => value - timeInHour[i]) / 100
    return hoursWorked
}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(obj => obj.firstName === firstName)
}

function calculatePayroll(array) {
    let payStubs = []
    array.forEach(emp => payStubs.push(allWagesFor.call(emp)))
    let payRoll = payStubs.reduce((accum, curr) => 
    accum + curr, 0)
    return payRoll
}