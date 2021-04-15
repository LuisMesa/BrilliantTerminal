const clear = require("clear");

const formsService = require("./src/utils/formsService");
const printService = require("./src/utils/printService");
const keyboard = require("./src/keyboard");

clear();

printService.printTitle(" Brilliant \nTerminal ");

async function start() {
  keyboard.printInitialKeyboard();
  const { instructions } = await formsService.askForInstructions();
  const alteredKeyboard = keyboard.alterInitialKeyboard(instructions);
  const { textToType } = await formsService.askForTextToType();
  keyboard.typeTextOnKeyboard(alteredKeyboard, textToType);
}

start();
