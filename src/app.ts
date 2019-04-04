#!/usr/bin/env node

import * as inquirer from "inquirer";
import attachToRunningContainer from "./attachToRunningContainer";

const tasks: { displayText: string; callback: () => Promise<Boolean> }[] = [
  {
    displayText: "Attach to running container",
    callback: attachToRunningContainer
  }
];

(async () => {
  try {
    const QUESTION = "Please select";
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: QUESTION,
        choices: tasks.map((task, index) => ({
          name: task.displayText,
          value: index
        }))
      }
    ]);

    await tasks[answer[QUESTION]].callback();

    return "Bey...";
  } catch (e) {
    console.error(e.message);
  }
})();
