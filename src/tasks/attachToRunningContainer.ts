import * as inquirer from "inquirer";
import { spawn } from "child_process";
import { shellExec } from "../helpers";

const BYE_MESSAGE = "Bye... 👋";
const PICK_USER_QUESTION = "As user";
const PICK_CONTAINER_QUESTION = "Attach to container";
const DOCKER_PS_FORMAT = "--format '{{.ID}}\t{{.Names}}'";

const getRunningContainers = async () => {
  const dockerContainers: string = await shellExec(
    `docker ps ${DOCKER_PS_FORMAT}`
  );

  return dockerContainers
    .trim()
    .split("\n")
    .filter(row => Boolean(row.length))
    .map(row => {
      const [id, name] = row.split("\t");

      return {
        id: id.trim(),
        name: name.trim()
      };
    });
};

async function attachToRunningContainer(): Promise<Boolean> {
  try {
    const runningContainers = await getRunningContainers();
    if (!Boolean(runningContainers.length)) {
      console.info("No running containers found!");
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: PICK_CONTAINER_QUESTION,
        choices: runningContainers.map(({ name }) => name)
      },
      { type: "input", name: PICK_USER_QUESTION, default: "root" }
    ]);

    const containerId = runningContainers
      .filter(({ name }) => name === answers[PICK_CONTAINER_QUESTION])
      .reduce((next, prev) => ({ ...next, ...prev })).id;

    const ssh = await spawn(
      "docker",
      `exec --user ${
        answers[PICK_USER_QUESTION]
        } -it ${containerId} bash`.split(" "),
      {
        stdio: "inherit"
      }
    );
    ssh.on("exit", () => console.log(BYE_MESSAGE));

    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}

export default {
  displayText: "Attach to running container",
  callback: attachToRunningContainer
}
