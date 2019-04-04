#!/usr/bin/env node

import * as inquirer from "inquirer";
import attachToRunningContainer from "./attachToRunningContainer";
import dockerStop from "./dockerStop";
import dockerNuke from "./dockerNuke";

const tasks: { displayText: string; callback: () => Promise<Boolean> }[] = [
  {
    displayText: "Attach to running container",
    callback: attachToRunningContainer
  },
  {
    displayText: "Stop all running containers",
    callback: dockerStop
  },
  {
    displayText: "⚠️ ⚠️ ⚠️ Stop and remove ALL containers and ALL images ☢️ ☢️ ☢️",
    callback: dockerNuke
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
