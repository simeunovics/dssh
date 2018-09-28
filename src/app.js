#!/usr/bin/env node

const inquirer = require('inquirer');
const { exec, spawn } = require('child_process');

const BYE_MESSAGE = 'Bye... 👋';
const PICK_USER_QUESTION = 'As user';
const PICK_CONTAINER_QUESTION = 'Attach to container';
const DOCKER_PS_FORMAT = "--format '{{.ID}}\t{{.Names}}'";

const shellExec = command =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout) => (error ? reject(error) : resolve(stdout)));
  });

const getRunningContainers = async () => {
  const dockerContainers = await shellExec(`docker ps ${DOCKER_PS_FORMAT}`);

  return dockerContainers
    .trim()
    .split('\n')
    .map(row => {
      [id, name] = row.split('\t');

      return {
        id: id.trim(),
        name: name.trim(),
      };
    });
};

(async () => {
  try {
    const runningContainers = await getRunningContainers();

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: PICK_CONTAINER_QUESTION,
        choices: runningContainers.map(({ name }) => name),
      },
      { type: 'input', name: PICK_USER_QUESTION, default: 'root' },
    ]);

    const containerId = runningContainers
      .filter(({ name }) => name === answers[PICK_CONTAINER_QUESTION])
      .reduce((next, prev) => ({ ...next, ...prev })).id;

    const ssh = await spawn(
      'docker',
      `exec --user ${
        answers[PICK_USER_QUESTION]
      } -it ${containerId} bash`.split(' '),
      {
        stdio: 'inherit',
      },
    );
    ssh.on('exit', () => console.log(BYE_MESSAGE));

    return 0;
  } catch (e) {
    console.error(e);
  }
})();
