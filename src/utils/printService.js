const chalk = require("chalk");
const figlet = require("figlet");

const background = "#202020";
const mainColor = "#00bcd4";

function printTitle(title) {
  // eslint-disable-next-line no-console
  console.log(chalk.bgHex(background).hex(mainColor)(figlet.textSync(title, { horizontalLayout: "full" })));
}

function printKeyboard(keyboard) {
  const delimiter = keyboard[0].map(() => "-").join("");

  // eslint-disable-next-line no-console
  console.log(delimiter);
  // eslint-disable-next-line no-console
  keyboard.map((row) => console.log(row.join("")));
  // eslint-disable-next-line no-console
  console.log(delimiter);
}

module.exports = {
  printKeyboard,
  printTitle
};
