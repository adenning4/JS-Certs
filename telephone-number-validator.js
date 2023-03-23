function telephoneCheck(str) {
  //define multiple regex patterns to attempt matching with
  //start with general filtering, then become more specific to catch all valid cases

  //probably a fancier way by using a regex generator with only a few rules, but this is accomplished with only 7 regular expressions and is easy to follor

  //starting with zero or one 1s, and is followed by 9 digits, and ends with a digit. Basic case with no spaces or symbols
  const r1 = /^1{0,1}\d{9}\d$/;

  //starting with 3 digits, followed by a space, followed by 3 digits, followed by a space, ending with 4 digits
  const r2 = /^\d{3} \d{3} \d{4}$/;

  //regex2 starting with a 1 followed by a space
  const r3 = /^1 \d{3} \d{3} \d{4}/;

  //starting with 3 digits, followed by a dash, followed by 3 digits, followed by a dash, ending with 4 digits
  const r4 = /^\d{3}-\d{3}-\d{4}$/;

  //regex4 starting with a 1 followed by a space
  const r5 = /^1 \d{3}-\d{3}-\d{4}$/;

  //starting with an open bracket, followed by 3 digits, followed by a closed bracket, followed by zero or one spaces, followed by three digits, followed by a dash, ending with 4 digits
  const r6 = /^\(\d{3}\) {0,1}\d{3}-\d{4}$/;

  //regex 6 starting with a 1 followed by zero or one spaces
  const r7 = /^1 {0,1}\(\d{3}\) {0,1}\d{3}-\d{4}$/;

  //create an array of all the regexs
  const regexs = [r1, r2, r3, r4, r5, r6, r7];
  //iterate through the regexs array
  for (let r in regexs) {
    //if one of the regex tests is true, return true
    if (regexs[r].test(str)) {
      return true;
    }
  }
  //if the for loop ends with no true catches, return false
  return false;
}

console.log(telephoneCheck("1 719 244 3051"));
//
