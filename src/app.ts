#!/usr/bin/env node

import * as inquirer from "inquirer";
import tasks from './tasks';

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

    return "Bye...";
  } catch (e) {
    console.error(e.message);
  }
})();
