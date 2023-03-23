function checkCashRegister(price, cash, cid) {
  //create an object to track changes in the register and prevent mutation of the input array
  const cidObj = Object.fromEntries(cid);

  //create a change object to track change issued
  const changeObj = {};

  //create a status object with each possible early return status
  const status = {
    INSUFFICIENT: {
      status: "INSUFFICIENT_FUNDS",
      change: [],
    },
    CLOSED: {
      status: "CLOSED",
      change: Object.entries(cidObj),
    },
  };

  //calculate how much change is due, this variable will be used to track remaining change as money comes out of the register
  let changeAmt = cash - price;
  //set aside another variable to track the total change required
  const initialChangeAmt = cash - price;

  //create a total amount function that reads the cid or change objects, and returns the total amount
  function totalAmt(obj) {
    //initialize total amount to 0
    let amt = 0;
    //iterate through each denomination and add the amount to amt
    for (let denom in obj) {
      amt += obj[denom];
    }
    //fix any accumulation errors, assuming small enough to be under 0.5
    amt = Math.round(amt * 100) / 100;
    return amt;
  }
  //UNCOMMENT TO SEE TOTAL AMOUNT IN DRAWER
  //console.log(totalAmt(cidobj))

  //return early in the simple case of change due being greater than or equal to the cid total amount
  if (changeAmt > totalAmt(cidObj)) {
    return status["INSUFFICIENT"];
  } else if (changeAmt === totalAmt(cidObj)) {
    return status["CLOSED"];
  }

  //create function that returns the largest denomination that can be subtracted from the changeAmt that also exists in cid
  //but first create an object that lists the denomination amount and name of the denomination
  const denoms = {
    100: "ONE HUNDRED",
    20: "TWENTY",
    10: "TEN",
    5: "FIVE",
    1: "ONE",
    0.25: "QUARTER",
    0.1: "DIME",
    0.05: "NICKEL",
    0.01: "PENNY",
  };
  //create an array for iteration, looking to iterate largest to smallest for the compare function
  const denomAmts = Object.keys(denoms).sort((a, b) => b - a);

  function compare(changeAmt) {
    for (let i = 0; i < denomAmts.length; i++) {
      //iterating through the denomination amounts, if the change required is larger than the current denomination AND the cash register has an amount of that denomination greater than zero, return that denomination amount for the switch statement
      if (
        changeAmt >= Number(denomAmts[i]) &&
        cidObj[denoms[denomAmts[i]]] > 0
      ) {
        return Number(denomAmts[i]);
      }
    }
    //if the iteration reaches the end where there is no suitable denomination in the register, return trigger statement for the switch
    return "no amount";
  }
  //UNCOMMENT TO TEST COMPARE FUNCTION
  //console.log(compare(6))

  //while the current change amount is less than the initial change amount, call the compare function, iterate until change reaches initial change amount (or other condition)
  //***second iteration

  while (totalAmt(changeObj) < initialChangeAmt) {
    let grab = compare(changeAmt);
    if (grab === "no amount") {
      return status["INSUFFICIENT"];
    }
    //reduce the remaining change amount, the round function is used to fix decimal error buildup observed during troubleshooting
    changeAmt = Math.round((changeAmt - grab) * 100) / 100;
    //add to the change object, if the change object does not have a property with the denomination name, then create one
    changeObj[denoms[grab]] =
      Math.round((changeObj[denoms[grab]] + grab) * 100) / 100 || grab;
    //reduce the denomination amount in the register
    cidObj[denoms[grab]] =
      Math.round((cidObj[denoms[grab]] - grab) * 100) / 100;
  }

  //************** below includes my initial solution, the while loop above was created to reduce the number of lines, and may improve readability
  /*
  while (totalAmt(changeObj) < initialChangeAmt) {
    switch (compare(changeAmt)) {
      case 100:
        //reduce the remaining change amount
        changeAmt -= 100;
        //add to the change object, if the change object does not have a property with the denomination name, then create one
        changeObj["ONE HUNDRED"] = changeObj["ONE HUNDRED"] + 100 || 100;
        //reduce the denomination amount in the register
        cidObj["ONE HUNDRED"] -= 100;
        break;
      case 20:
        changeAmt -= 20;
        changeObj["TWENTY"] = changeObj["TWENTY"] + 20 || 20;
        cidObj["TWENTY"] -= 20;
        break;
      case 10:
        changeAmt -= 10;
        changeObj["TEN"] = changeObj["TEN"] + 10 || 10;
        cidObj["TEN"] -= 10;
        break;
      case 5:
        changeAmt -= 5;
        changeObj["FIVE"] = changeObj["FIVE"] + 5 || 5;
        cidObj["FIVE"] -= 5;
        break;
      case 1:
        changeAmt -= 1;
        changeObj["ONE"] = changeObj["ONE"] + 1 || 1;
        cidObj["ONE"] -= 1;
        break;
      case 0.25:
        //use the round function to get rid of any decimal error buildup
        changeAmt = Math.round((changeAmt - 0.25) * 100) / 100;
        changeObj["QUARTER"] = changeObj["QUARTER"] + 0.25 || 0.25;
        cidObj["QUARTER"] = Math.round((cidObj["QUARTER"] - 0.25) * 100) / 100;
        break;
      case 0.1:
        changeAmt = Math.round((changeAmt - 0.1) * 100) / 100;
        changeObj["DIME"] = changeObj["DIME"] + 0.1 || 0.1;
        cidObj["DIME"] = Math.round((cidObj["DIME"] - 0.1) * 100) / 100;
        break;
      case 0.05:
        changeAmt = Math.round((changeAmt - 0.05) * 100) / 100;
        changeObj["NICKEL"] = changeObj["NICKEL"] + 0.05 || 0.05;
        cidObj["NICKEL"] = Math.round((cidObj["NICKEL"] - 0.05) * 100) / 100;
        break;
      case 0.01:
        changeAmt = Math.round((changeAmt - 0.01) * 100) / 100;
        changeObj["PENNY"] = changeObj["PENNY"] + 0.01 || 0.01;
        cidObj["PENNY"] = Math.round((cidObj["PENNY"] - 0.01) * 100) / 100;
        break;
      case "no amount":
        return status["INSUFFICIENT"];
    }
  }
  */
  return { status: "OPEN", change: Object.entries(changeObj) };
}

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
