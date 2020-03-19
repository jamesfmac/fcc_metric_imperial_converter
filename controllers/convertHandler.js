/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const math = require("mathjs");

function ConvertHandler() {
  this.getNum = function(input) {
    if (!input) return "invalid number and unit";
    const numReg = /[\d./]+/g;
    // Input has no number, only a unit
    if (input.match(numReg) === null) return 1;

    // Strip input of valid/invalid units
    const unitRegex = /([^\d]+$)/;
    const numOrEq = input.replace(unitRegex, "");

    const letterRegex = /[a-zA-Z]+/;
    // Input is something like '1a3lbs' or 'a4gal'
    if (numOrEq.match(letterRegex)) return "invalid number";

    const result = math.evaluate(numOrEq);

    return +result.toFixed(5);
  };

  this.getUnit = function(input) {
    if (!input) return "invalid number and unit";
    const allowedUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    var result;
    let unitReg = /[a-zA-Z]+$/;
    result = input.match(unitReg);
    if (!result) return "no unit";
    let unit = result[0].toLowerCase();
    if (allowedUnits.indexOf(unit) === -1) {
      return "invalid unit";
    }
    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const returnUnits = {
      gal: "l",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
      L: "blah"
    };
    var result;

    return returnUnits[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const returnSpelling = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms"
    };

    return returnSpelling[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    //["gal", "l", "mi", "km", "lbs", "kg"];

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    return +result.toFixed(5);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;

    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
