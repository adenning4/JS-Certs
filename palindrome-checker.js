function palindrome(str) {
  //(filter the input through a regex check and into a new variable
  //remove all non-alphanumeric characters)
  //create a new array to catch filter results
  const filtered = [];
  //split the input into an array of individual characters, and assign to an array
  const splitStr = str.split("");
  //define the regex to filter by
  const regex = /[A-Za-z0-9]/;
  //read through the individual characters
  for (let char in splitStr) {
    //compare each character to the regex
    //if it passes the check, convert to uppercase, then pass it to the new variable array
    if (regex.test(splitStr[char])) {
      filtered.push(splitStr[char].toUpperCase());
    }
  }
  //UNCOMMENT TO VERIFY FILTERED ARRAY IS AS EXPECTED
  //console.log(filtered);

  //iterate through the new array
  for (let i = 0; i < filtered.length; i++) {
    //compare the first index to the last index, if false, return false, ending the function call
    //compare the second index to the second to last index, if false, return false,
    //so on and so forth...
    if (filtered[i] !== filtered[filtered.length - (1 + i)]) {
      return false;
    }
  }
  //if no iteration in the for loop returns false, then return true
  return true;
}

console.log(palindrome("0_0 (: /- :) 0-1"));
//
