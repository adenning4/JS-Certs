function convertToRoman(num) {
  //ASSUMING ALL INPUT LESS THAN 10,000
  //define the base numerals in an object
  //define as numeral with corresponding magnitude equaling the number of zeros
  const numerals = {
    1: { 1: "I", 5: "V" },
    2: { 1: "X", 5: "L" },
    3: { 1: "C", 5: "D" },
    4: { 1: "M" },
  };

  //define a constructor function that reads in strings...
  //if the first digit is 1, 2, or 3, return the numeral repeated
  //if the first digit is 4, return the corresponding numeral as 1 of corresponding magnitude followed by 5 of corresponding magnitude
  //if the first digit is 6, 7, or 8, return the corresponding numeral as 5 of corresponding magnitude followed by the numeral repeated
  //if the first digit is 9, return the corresponding numeral as 1 of 1 greater magnitude, followed by 1 of the same magnitude
  //if the input number is greater than 1000, repeat the first digit
  function singleNumeral(num) {
    const len = num.length;
    const firstDig = Number(num[0]);
    switch (len) {
      case 1:
      case 2:
      case 3:
        switch (firstDig) {
          case 1:
          case 2:
          case 3:
            //if the first digit is 1, 2, or 3, return the corresponding magnitude '1' numeral the number of times as the first digit
            return "".padEnd(firstDig, numerals[len][1]);

          case 4:
            //if the first digit is 4, return the corresponding numeral as 1 of corresponding magnitude followed by 5 of corresponding magnitude
            return numerals[len][1] + numerals[len][5];

          case 5:
            //if the first digit is 5, return the corresponding numeral as 5 of corresponding magnitude
            return numerals[len][5];

          case 6:
          case 7:
          case 8:
            //if the first digit is 6, 7, or 8, return the corresponding numeral as 5 of corresponding magnitude followed by the corresponding magnitude numeral 1 repeated as amount greater than 5
            return numerals[len][5] + "".padEnd(firstDig - 5, numerals[len][1]);

          case 9:
            //if the first digit is 9, return the corresponding numeral as 1 of of the same magnitude followed by numeral 1 of 1 greater magnitude
            return numerals[len][1] + numerals[len + 1][1];
        }
        break;

      case 4:
        return "".padEnd(Number(num[0]), numerals[4][1]);
    }
  }
  //UNCOMMENT TO TEST THE singleNumeral FUNCTION, WILL ONLY RETURN NUMERAL BASED ON THE VALUE OF THE FIRST DIGIT (I.E 123 = C)
  //console.log(singleNumeral('6'))

  //split the input into its individual numbers
  const numbers = String(num).split("");

  //determine the magnitude of the individual number (how many zeros after?) replace each individual number, with its coresponding number including zeros (i.e 22 = [2,2] = [20,2])
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i].padEnd(numbers.length - i, "0");
  }
  //UNCOMMENT TO VERIFY NUMBERS IS AS EXPECTED
  //console.log(numbers)

  //define an empty array to catch numeral strings
  const numStr = [];

  //iterate through the updated individual numbers
  for (let num in numbers) {
    //call the constructor function, append the result to the new array
    numStr.push(singleNumeral(numbers[num]));
  }

  //join the new string array and return
  return numStr.join("");
}

console.log(convertToRoman(3999));

//
