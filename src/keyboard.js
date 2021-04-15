const { buildKeyboardByName } = require("./utils/keyboards");
const { translateInstructionsToTransformations } = require("./instructions");
const { printKeyboard } = require("./utils/printService");

const initialKeyboard = buildKeyboardByName("qwerty");

function executeInstructions(keyboard, instructions) {
  const transformations = translateInstructionsToTransformations(instructions);

  return transformations
    .reduce((keyboardResult, { transformation, timesOrMovements }) => transformation(keyboardResult, timesOrMovements), keyboard);
}

function buildTextWithAlteredKeyboard(oldKeyboard, alteredKeyboard, textToType) {
  function convertTypedKeysToCoordinates() {
    const flatOldKeyboard = oldKeyboard.flat();

    return textToType.toLowerCase().split("").map((key) => {
      const index = flatOldKeyboard.indexOf(key);

      return [Math.floor(index / oldKeyboard[0].length), index % oldKeyboard[0].length];
    });
  }

  return convertTypedKeysToCoordinates().reduce((newTypedKeys, [row, column]) => newTypedKeys + alteredKeyboard[row][column], "");
}

function printInitialKeyboard() {
  // eslint-disable-next-line no-console
  console.log("Initial keyboard:");
  printKeyboard(initialKeyboard);
}

function alterInitialKeyboard(instructions) {
  const alteredKeyboard = executeInstructions(initialKeyboard, instructions);

  // eslint-disable-next-line no-console
  console.log("Altered keyboard:");
  printKeyboard(alteredKeyboard);

  return alteredKeyboard;
}

function typeTextOnKeyboard(alteredKeyboard, textToType) {
  const typedText = buildTextWithAlteredKeyboard(initialKeyboard, alteredKeyboard, textToType);

  // eslint-disable-next-line no-console
  console.log("Same text typed on altered keyboard:");
  // eslint-disable-next-line no-console
  console.log(typedText);
}

module.exports = {
  printInitialKeyboard,
  alterInitialKeyboard,
  typeTextOnKeyboard
};
