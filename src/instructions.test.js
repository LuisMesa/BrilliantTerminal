const { translateInstructionsToTransformations } = require("./instructions.js");
const { flipVertically, flipHorizontally, shift } = require("./transformations.js");

test("Translate horizontal flip instructions", () => {
  let transformations = translateInstructionsToTransformations("H");

  expect(transformations).toEqual([{ transformation: flipHorizontally, timesOrMovements: 1 }]);

  transformations = translateInstructionsToTransformations("HH");

  expect(transformations).toEqual([{ transformation: flipHorizontally, timesOrMovements: 2 }]);

  transformations = translateInstructionsToTransformations("HHHHH");

  expect(transformations).toEqual([{ transformation: flipHorizontally, timesOrMovements: 5 }]);
});

test("Translate vertical flip instructions", () => {
  let transformations = translateInstructionsToTransformations("V");

  expect(transformations).toEqual([{ transformation: flipVertically, timesOrMovements: 1 }]);

  transformations = translateInstructionsToTransformations("VV");

  expect(transformations).toEqual([{ transformation: flipVertically, timesOrMovements: 2 }]);

  transformations = translateInstructionsToTransformations("VVVVV");

  expect(transformations).toEqual([{ transformation: flipVertically, timesOrMovements: 5 }]);
});

test("Translate shift instructions", () => {
  let transformations = translateInstructionsToTransformations("S1");

  expect(transformations).toEqual([{ transformation: shift, timesOrMovements: 1 }]);

  transformations = translateInstructionsToTransformations("S2");

  expect(transformations).toEqual([{ transformation: shift, timesOrMovements: 2 }]);

  transformations = translateInstructionsToTransformations("S5");

  expect(transformations).toEqual([{ transformation: shift, timesOrMovements: 5 }]);

  transformations = translateInstructionsToTransformations("S-1");

  expect(transformations).toEqual([{ transformation: shift, timesOrMovements: -1 }]);

  transformations = translateInstructionsToTransformations("S-5");

  expect(transformations).toEqual([{ transformation: shift, timesOrMovements: -5 }]);

  transformations = translateInstructionsToTransformations("S1S5");

  expect(transformations).toEqual([
    { transformation: shift, timesOrMovements: 1 },
    { transformation: shift, timesOrMovements: 5 }
  ]);

  transformations = translateInstructionsToTransformations("S1S5S2");

  expect(transformations).toEqual([
    { transformation: shift, timesOrMovements: 1 },
    { transformation: shift, timesOrMovements: 5 },
    { transformation: shift, timesOrMovements: 2 }
  ]);
});

test("Translate multiple different instructions", () => {
  let transformations = translateInstructionsToTransformations("S1VH");

  expect(transformations).toEqual([
    { transformation: shift, timesOrMovements: 1 },
    { transformation: flipVertically, timesOrMovements: 1 },
    { transformation: flipHorizontally, timesOrMovements: 1 }
  ]);

  transformations = translateInstructionsToTransformations("S3VVVHHH");

  expect(transformations).toEqual([
    { transformation: shift, timesOrMovements: 3 },
    { transformation: flipVertically, timesOrMovements: 3 },
    { transformation: flipHorizontally, timesOrMovements: 3 }
  ]);

  transformations = translateInstructionsToTransformations("S3VHVHVS-1");

  expect(transformations).toEqual([
    { transformation: shift, timesOrMovements: 3 },
    { transformation: flipVertically, timesOrMovements: 1 },
    { transformation: flipHorizontally, timesOrMovements: 1 },
    { transformation: flipVertically, timesOrMovements: 1 },
    { transformation: flipHorizontally, timesOrMovements: 1 },
    { transformation: flipVertically, timesOrMovements: 1 },
    { transformation: shift, timesOrMovements: -1 }
  ]);

  transformations = translateInstructionsToTransformations("HHVS12VHVHS3");

  expect(transformations).toEqual([
    { transformation: flipHorizontally, timesOrMovements: 2 },
    { transformation: flipVertically, timesOrMovements: 1 },
    { transformation: shift, timesOrMovements: 12 },
    { transformation: flipVertically, timesOrMovements: 1 },
    { transformation: flipHorizontally, timesOrMovements: 1 },
    { transformation: flipVertically, timesOrMovements: 1 },
    { transformation: flipHorizontally, timesOrMovements: 1 },
    { transformation: shift, timesOrMovements: 3 }
  ]);
});
