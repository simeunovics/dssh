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

    const question = 'Select container to SSH into';
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: question,
        choices: choices.map(({ name, id }) => name),
      },
    ]);
    const containerId = choices
      .filter(choice => choice.name.trim() === answers[question].trim())
      .reduce((next, prev) => ({ ...next, ...prev }), {}).id;

    const ssh = await spawn(
      'docker',
      `exec -it ${containerId} bash`.split(' '),
      {
        stdio: 'inherit',
      },
    );
    ssh.on('exit', () => console.log('👋'));

    return 0;
  } catch (e) {
    console.error(e);
  }
})();
