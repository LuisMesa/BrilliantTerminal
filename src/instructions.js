const { getTransformationByInstruction, constants } = require("./transformations");

const { horizontalInstruction, verticalInstruction, switchInstruction } = constants;

function translateInstructionsToTransformations(instructions) {
  function isMovementChar(char) {
    return char === "-" || !isNaN(char);
  }

  const instructionsArray = instructions.split("");
  const transformations = [];

  let lastInstruction;
  let lastInstructionCount = 0;
  let lastInstructionMovementsString = "";

  for (let i = 0; i < instructionsArray.length; i++) {
    if (lastInstruction === switchInstruction) {
      if (isMovementChar(instructionsArray[i])) {
        lastInstructionMovementsString += instructionsArray[i];
      }
      if (!isMovementChar(instructionsArray[i]) || i === instructionsArray.length - 1) {
        transformations.push({
          transformation: getTransformationByInstruction(lastInstruction),
          timesOrMovements: +lastInstructionMovementsString
        });

        lastInstructionMovementsString = "";
      }
    }

    if (lastInstruction === instructionsArray[i] && instructionsArray[i] !== switchInstruction) {
      lastInstructionCount++;
    } else {
      if ((lastInstruction && lastInstruction !== switchInstruction)) {
        transformations.push({
          transformation: getTransformationByInstruction(lastInstruction),
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
      && (instructionsArray[i] === horizontalInstruction || instructionsArray[i] === verticalInstruction)
    ) {
      transformations.push({
        transformation: getTransformationByInstruction(lastInstruction || instructionsArray[i]),
        timesOrMovements: lastInstructionCount
      });
    }
  }

  return transformations;
}

module.exports = {
  translateInstructionsToTransformations
};
