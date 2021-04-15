const inquirer = require("inquirer");

function askForInstructions() {
  return inquirer.prompt([
    {
      name: "instructions",
      type: "input",
      message: "Enter the instructions you want to apply to the keyboard (i.e: HHVS12VHVHS3)",
      validate(value) {
        return !!value.length || "Please enter some instructions";
      }
    }
  ]);
}

function askForTextToType() {
  return inquirer.prompt([
    {
      name: "textToType",
      type: "input",
      message: "Enter the text to type in the altered keyboard (i.e: Brilliant)",
      validate(value) {
        return !!value.length || "Please enter some instructions";
      }
    }
  ]);
}

module.exports = {
  askForInstructions,
  askForTextToType
};
