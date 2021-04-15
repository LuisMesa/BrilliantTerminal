const horizontalInstruction = "H";
const verticalInstruction = "V";
const switchInstruction = "S";

function flipHorizontally(oldKeyboard, times = 1) {
  return flipIfNeeded(oldKeyboard, times, () => oldKeyboard.map((row) => [...row].reverse()));
}

function flipVertically(oldKeyboard, times = 1) {
  return flipIfNeeded(oldKeyboard, times, () => [...oldKeyboard].reverse());
}

function flipIfNeeded(oldKeyboard, times, flip) {
  if (times % 2 === 0) {
    return oldKeyboard;
  } else {
    return flip();
  }
}

function shift(oldKeyboard, movements) {
  const numberOfKeys = oldKeyboard.length * oldKeyboard[0].length;
  const neededMovements = movements % numberOfKeys;

  if (neededMovements === 0) {
    return oldKeyboard;
  } else {
    const flatOldKeyboard = oldKeyboard.flat();
    const keyboardArray = flatOldKeyboard.slice(-neededMovements).concat(flatOldKeyboard.slice(0, -neededMovements));
    const newKeyboard = [...new Array(oldKeyboard.length)].map(() => []);

    keyboardArray.forEach((key, index) => {
      const row = Math.floor(index / oldKeyboard[0].length);
      const column = index % oldKeyboard[0].length;

      newKeyboard[row][column] = key;
    });

    return newKeyboard;
  }
}

function getTransformationByInstruction(instruction) {
  switch (instruction) {
    case horizontalInstruction:
      return flipHorizontally;
    case verticalInstruction:
      return flipVertically;
    case switchInstruction:
      return shift;
    default:
      throw new Error(`Instruction ${instruction} is not defined`);
  }
}

module.exports = {
  flipHorizontally,
  flipVertically,
  shift,
  getTransformationByInstruction,
  constants: {
    horizontalInstruction,
    verticalInstruction,
    switchInstruction
  }
};
