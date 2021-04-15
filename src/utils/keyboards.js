const keyboardsByName = {
  qwerty: "1234567890\nqwertyuiop\nasdfghjkl;\nzxcvbnm,./"
};

function buildKeyboard(keyboardName) {
  return keyboardsByName[keyboardName].split("\n").map((row) => row.split(""));
}

module.exports = {
  buildKeyboard
};
