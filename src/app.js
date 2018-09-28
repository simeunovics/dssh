#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { exec, spawn } = require('child_process');
const inquirer = require('inquirer');

const PICK_CONTAINER_QUESTION = 'Select container to SSH into';
const PICK_USER_QUESTION = 'As which user?';
const BYE_MESSAGE = 'Bye... 👋';
const DOCKER_PS_FORMAT = "--format '{{.ID}}\t{{.Names}}'";

const shellExec = command => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      return resolve(stdout);
    });
  });
};

(async () => {
  try {
    const hasDockerCompose = fs.existsSync(
      path.join(__dirname, 'docker-compose.yml'),
    );
    const command =
      (hasDockerCompose ? 'docker-compose' : 'docker') +
      ' ps '+ DOCKER_PS_FORMAT;

    const dockerContainers = await shellExec(command);
    const choices = dockerContainers
      .trim()
      .split('\n')
      .map(row => {
        [id, name] = row.split('\t');

        return {
          id: id.trim(),
          name: name.trim(),
        };
      });

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: PICK_CONTAINER_QUESTION,
        choices: choices.map(({ name, id }) => name),
      },
      { type: 'input', name: PICK_USER_QUESTION, default: 'root' },
    ]);
    const containerId = choices
      .filter(({ name }) => name === answers[PICK_CONTAINER_QUESTION])
      .reduce((next, prev) => ({ ...next, ...prev })).id;

    const user = answers[PICK_USER_QUESTION];

    const ssh = await spawn(
      'docker',
      `exec --user ${user} -it ${containerId} bash`.split(' '),
      {
        stdio: 'inherit',
      },
    );
    ssh.on('exit', () => console.log('\033c', BYE_MESSAGE));

    return 0;
  } catch (e) {
    console.error(e);
  }
})();
