const initialKeyboard = "1234567890\nqwertyuiop\nasdfghjkl;\nzxcvbnm,./".split("\n").map((row) => row.split(""));

function horizontalFlip(oldKeyboard, times = 1) {
  return flipIfNeeded(oldKeyboard, times, () => oldKeyboard.map((row) => [...row].reverse()));
}

function verticalFlip(oldKeyboard, times = 1) {
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

function executeInstructions(keyboard, instructions) {
  const transformations = translateStringToTransformations(instructions);

  return transformations
    .reduce((keyboardResult, { transformation, timesOrMovements }) => transformation(keyboardResult, timesOrMovements), keyboard);
}

function translateStringToTransformations(instructions) {
  function getMethodByInstruction(instruction) {
    switch (instruction) {
      case "H":
        return horizontalFlip;
      case "V":
        return verticalFlip;
      case "S":
        return shift;
      default:
        throw new Error(`Instruction ${instruction} is not defined`);
    }
  }

  function isMovementChar(char) {
    return char === "-" || !isNaN(char);
  }

  const instructionsArray = instructions.split("");
  const transformations = [];

  let lastInstruction;
  let lastInstructionCount = 0;
  let lastInstructionMovementsString = "";

  for (let i = 0; i < instructionsArray.length; i++) {
    if (lastInstruction === "S") {
      if (isMovementChar(instructionsArray[i])) {
        lastInstructionMovementsString += instructionsArray[i];
      }
      if (!isMovementChar(instructionsArray[i]) || i === instructionsArray.length - 1) {
        transformations.push({
          transformation: getMethodByInstruction(lastInstruction),
          timesOrMovements: +lastInstructionMovementsString
        });

        lastInstructionMovementsString = "";
      }
    }

    if (lastInstruction === instructionsArray[i] && instructionsArray[i] !== "S") {
      lastInstructionCount++;
    } else {
      if ((lastInstruction && lastInstruction !== "S")) {
        transformations.push({
          transformation: getMethodByInstruction(lastInstruction),
          timesOrMovements: lastInstructionCount
        });
      }

      if (lastInstruction !== instructionsArray[i] && !isMovementChar(instructionsArray[i])) {
        lastInstruction = instructionsArray[i];
        lastInstructionCount = 1;
      }
    }

    if (
      i === instructionsArray.length - 1
      && !isMovementChar(instructionsArray[i])
      && (instructionsArray[i] === "H" || instructionsArray[i] === "V")
    ) {
      transformations.push({
        transformation: getMethodByInstruction(lastInstruction || instructionsArray[i]),
        timesOrMovements: lastInstructionCount
      });
    }
  }

  return transformations;
}

function typeOnAlteredKeyboard(oldKeyboard, alteredKeyboard, typedKeys) {
  function convertTypedKeysToCoordinates() {
    const flatOldKeyboard = oldKeyboard.flat();

    return typedKeys.toLowerCase().split("").map((key) => {
      const index = flatOldKeyboard.indexOf(key);

      return [Math.floor(index / oldKeyboard[0].length), index % oldKeyboard[0].length];
    });
  }

  return convertTypedKeysToCoordinates().reduce((newTypedKeys, [row, column]) => newTypedKeys + alteredKeyboard[row][column], "");
}

function print(keyboard) {
  keyboard.map((r) => console.log(r.join("")));
}

console.log("Initial keyboard:");
print(initialKeyboard);

const alteredKeyboard = executeInstructions(initialKeyboard, "HHVS12VHVHS3");
console.log("Altered keyboard:");
print(alteredKeyboard);

console.log("Same text typed in altered keyboard:");
console.log(typeOnAlteredKeyboard(initialKeyboard, alteredKeyboard, "Brilliant"));
