# BrilliantTerminal

## How to run
```
node index.js
```
or
```
nodemon index.js
```

## Progress log
*08:18 - 08:50:*
Understanding the problem and planning how to solve it.

*08:50 - 10:10:*
The initial version of the main functions (shift and flip) were implemented.
Some optimizations were applied, for example avoiding unneeded transformations. Manual testing was done.

*10:10 - 11:20:*
The functions on charge of reading both inputs were implemented, they took longer than expected.

*11:20 - 12:20*
Testing and debugging, one of the methods was doing its job but was mutating the initial keyboard instead of returning a new copy.
I did not want to have side effects in the main functions, so I had to spend some time finding and fixing the issue.

*12:20 - 12:30*
Fix minor details, order the code, remove some unneeded code and submit the solution in one file.

*12:30 - 14:15*
Multiple improvements were implemented 🧐:
- Create a git repository and upload the code to Github.
- Separate in multiple files the code in order to have a better project structure.
- Improve the CLI and include some libraries.
- Include eslint
- More details [in this commit](https://github.com/LuisMesa/BrilliantTerminal/commit/8292a1925be1a483ead4a4678ab48addfc933993)

*14:15 - 15:30*
20 Tests using Jest were implemented and all of them are working properly 🎉

*14:15 - 15:45*
The progress log was created.

## Relevant links
https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
