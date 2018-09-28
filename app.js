//@flow
const path = require('path');
const fs = require('fs');
const { exec, spawn } = require('child_process');
const inquirer = require('inquirer');

const shellExec = command => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
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
      " ps --format '{{.ID}}\t{{.Names}}'";

    const res = await shellExec(command);
    const choices = res
      .trim()
      .split('\n')
      .map(row => {
        [id, name] = row.split('\t');

        return {
          id: id.trim(),
          name: name.trim(),
        };
      });

    const containerPickQuestion = 'Select container to SSH into';
    const userPickQuestion = 'As which user?';
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: containerPickQuestion,
        choices: choices.map(({ name, id }) => name),
      },
      { type: 'input', name: userPickQuestion, default: 'root' },
    ]);
    const containerId = choices
      .filter(
        choice => choice.name.trim() === answers[containerPickQuestion].trim(),
      )
      .reduce((next, prev) => ({ ...next, ...prev })).id;

    const user = answers[userPickQuestion];

    const ssh = await spawn(
      'docker',
      `exec --user ${user} -it ${containerId} bash`.split(' '),
      {
        stdio: 'inherit',
      },
    );
    ssh.on('exit', () => console.log('\033c', 'Bye... 👋'));

    return 0;
  } catch (e) {
    console.error(e);
  }
})();
