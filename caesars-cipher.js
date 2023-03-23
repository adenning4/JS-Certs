function rot13(str) {
  const shiftAmt = 13;
  //create a new array
  const strArr = [];
  //split the input string by spaces and assign to an array
  const splitStr = str.split(" ");
  //iterate through the array
  for (let word in splitStr) {
    //split the word by characters and assign to an array
    const chars = splitStr[word].split("");
    //push an empty subarray onto the new array
    strArr.push([]);
    //iterate through each character
    for (let char in chars) {
      //test each character against a regex
      const regex = /[A-Z]/;
      if (regex.test(chars[char])) {
        //if the character is a letter, convert to utf encoding and assign to variable, if not a letter, push to the subarray
        let shift = splitStr[word].charCodeAt(char);
        //add 13 to the variable, account for wraparound
        if (shift + shiftAmt <= "Z".charCodeAt(0)) {
          shift += shiftAmt;
        } else {
          let adjust = shift + shiftAmt - "Z".charCodeAt(0);
          //console.log(adjust)
          shift = "A".charCodeAt(0) - 1 + adjust;
        }
        //convert back to a character
        shift = String.fromCharCode(shift);
        //push the converted character to the subarray
        strArr[word].push(shift);
      } else {
        //if character is not [A-Z], push the character unchanged
        strArr[word].push(chars[char]);
      }
    }
  }
  //create new empty array
  const result = [];
  //iterate through the array now containing subarrays
  for (let splitWord in strArr) {
    //join each subarray with empty spaces, and push to the new array
    result.push(strArr[splitWord].join(""));
  }
  //join the populated new array with spaces and return
  return result.join(" ");
}

console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));

///
