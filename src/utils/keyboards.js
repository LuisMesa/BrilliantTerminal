const keyboardsByName = {
  qwerty: "1234567890\nqwertyuiop\nasdfghjkl;\nzxcvbnm,./"
};

function buildKeyboardByName(keyboardName) {
  return buildKeyboardFromString(keyboardsByName[keyboardName]);
}

function buildKeyboardFromString(keyboardString) {
  return keyboardString.split("\n").map((row) => row.split(""));
}

module.exports = {
  buildKeyboardByName,
  buildKeyboardFromString
};
