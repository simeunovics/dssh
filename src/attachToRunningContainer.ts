import * as inquirer from "inquirer";
import { exec, spawn, ExecException } from "child_process";

const BYE_MESSAGE = "Bye... 👋";
const PICK_USER_QUESTION = "As user";
const PICK_CONTAINER_QUESTION = "Attach to container";
const DOCKER_PS_FORMAT = "--format '{{.ID}}\t{{.Names}}'";

const shellExec = async (command: string) =>
  new Promise<string>((resolve: Function, reject: Function) => {
    exec(
      command,
      (error: ExecException | null, stdout: string, stderr: string): string => {
        return error ? reject(stderr) : resolve(stdout);
      }
    );
  });

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

export default async function attachToRunningContainer(): Promise<Boolean> {
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
