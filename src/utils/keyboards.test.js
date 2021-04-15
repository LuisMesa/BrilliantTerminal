const { buildKeyboardFromString } = require("./keyboards");

test("Build keyboard from string", () => {
  const keyboard = buildKeyboardFromString("1234567890\nqwertyuiop\nasdfghjkl;\nzxcvbnm,./");
  const qwertyKeyboard = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
  ];

  expect(keyboard).toEqual(qwertyKeyboard);
});
