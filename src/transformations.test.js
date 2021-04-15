const { buildKeyboardByName, buildKeyboardFromString } = require("./utils/keyboards");
const { flipVertically, flipHorizontally, shift } = require("./transformations.js");

const initialKeyboard = buildKeyboardByName("qwerty");
const keyboardAfterOneHorizontalFlip = buildKeyboardFromString("0987654321\npoiuytrewq\n;lkjhgfdsa\n/.,mnbvcxz");
const keyboardAfterOneVerticalFlip = buildKeyboardFromString("zxcvbnm,./\nasdfghjkl;\nqwertyuiop\n1234567890");
const keyboardAfterOnePositiveShift = buildKeyboardFromString("/123456789\n0qwertyuio\npasdfghjkl\n;zxcvbnm,.");
const keyboardAfterOneNegativeShift = buildKeyboardFromString("234567890q\nwertyuiopa\nsdfghjkl;z\nxcvbnm,./1");

test("Horizontally flip does not mutate origin keyboard", () => {
  flipHorizontally(initialKeyboard, 1);

  expect(initialKeyboard).toEqual(buildKeyboardByName("qwerty"));
});

test("Horizontally flip the keyboard one time", () => {
  const alteredKeyboard = flipHorizontally(initialKeyboard, 1);

  expect(alteredKeyboard).toEqual(keyboardAfterOneHorizontalFlip);
});

test("Horizontally flip the keyboard two times", () => {
  const alteredKeyboard = flipHorizontally(initialKeyboard, 2);

  expect(alteredKeyboard).toEqual(initialKeyboard);
});

test("Horizontally flip the keyboard n times, where n is an odd number and n is greater than 1", () => {
  let alteredKeyboard = flipHorizontally(initialKeyboard, 3);

  expect(alteredKeyboard).toEqual(keyboardAfterOneHorizontalFlip);

  alteredKeyboard = flipHorizontally(initialKeyboard, 5);

  expect(alteredKeyboard).toEqual(keyboardAfterOneHorizontalFlip);

  alteredKeyboard = flipHorizontally(initialKeyboard, Number.MAX_SAFE_INTEGER);

  expect(alteredKeyboard).toEqual(keyboardAfterOneHorizontalFlip);
});

test("Horizontally flip the keyboard n times, where n is an even number n is greater than 2", () => {
  let alteredKeyboard = flipHorizontally(initialKeyboard, 4);

  expect(alteredKeyboard).toEqual(initialKeyboard);

  alteredKeyboard = flipHorizontally(initialKeyboard, 6);

  expect(alteredKeyboard).toEqual(initialKeyboard);

  alteredKeyboard = flipHorizontally(initialKeyboard, Number.MAX_SAFE_INTEGER - 1);

  expect(alteredKeyboard).toEqual(initialKeyboard);
});

test("Vertically flip does not mutate origin keyboard", () => {
  flipVertically(initialKeyboard, 1);

  expect(initialKeyboard).toEqual(buildKeyboardByName("qwerty"));
});

test("Vertically flip the keyboard one time", () => {
  const alteredKeyboard = flipVertically(initialKeyboard, 1);

  expect(alteredKeyboard).toEqual(keyboardAfterOneVerticalFlip);
});

test("Vertically flip the keyboard two times", () => {
  const alteredKeyboard = flipVertically(initialKeyboard, 2);

  expect(alteredKeyboard).toEqual(initialKeyboard);
});

test("Vertically flip the keyboard n times, where n is an odd number and n is greater than 1", () => {
  let alteredKeyboard = flipVertically(initialKeyboard, 3);

  expect(alteredKeyboard).toEqual(keyboardAfterOneVerticalFlip);

  alteredKeyboard = flipVertically(initialKeyboard, 5);

  expect(alteredKeyboard).toEqual(keyboardAfterOneVerticalFlip);

  alteredKeyboard = flipVertically(initialKeyboard, Number.MAX_SAFE_INTEGER);

  expect(alteredKeyboard).toEqual(keyboardAfterOneVerticalFlip);
});

test("Vertically flip the keyboard n times, where n is an even number n is greater than 2", () => {
  let alteredKeyboard = flipVertically(initialKeyboard, 4);

  expect(alteredKeyboard).toEqual(initialKeyboard);

  alteredKeyboard = flipVertically(initialKeyboard, 6);

  expect(alteredKeyboard).toEqual(initialKeyboard);

  alteredKeyboard = flipVertically(initialKeyboard, Number.MAX_SAFE_INTEGER - 1);

  expect(alteredKeyboard).toEqual(initialKeyboard);
});

test("Shift does not mutate origin keyboard", () => {
  shift(initialKeyboard, 1);

  expect(initialKeyboard).toEqual(buildKeyboardByName("qwerty"));
});

test("Shift the keyboard one time in the positive direction", () => {
  const alteredKeyboard = shift(initialKeyboard, 1);

  expect(alteredKeyboard).toEqual(keyboardAfterOnePositiveShift);
});

test("Shift the keyboard multiple times in the positive direction", () => {
  let alteredKeyboard = shift(initialKeyboard, 2);

  expect(alteredKeyboard).toEqual(buildKeyboardFromString("./12345678\n90qwertyui\nopasdfghjk\nl;zxcvbnm,"));

  alteredKeyboard = shift(initialKeyboard, 41);

  expect(alteredKeyboard).toEqual(keyboardAfterOnePositiveShift);
});

test("Shift the keyboard one time in the negative direction", () => {
  const alteredKeyboard = shift(initialKeyboard, -1);

  expect(alteredKeyboard).toEqual(keyboardAfterOneNegativeShift);
});

test("Shift the keyboard multiple times in the negative direction", () => {
  let alteredKeyboard = shift(initialKeyboard, -2);

  expect(alteredKeyboard).toEqual(buildKeyboardFromString("34567890qw\nertyuiopas\ndfghjkl;zx\ncvbnm,./12"));

  alteredKeyboard = shift(initialKeyboard, -41);

  expect(alteredKeyboard).toEqual(keyboardAfterOneNegativeShift);
});
