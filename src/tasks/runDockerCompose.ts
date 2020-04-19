import * as inquirer from 'inquirer';
import createTerminal from '../Services/Terminal';
import { factory } from '../Services/CommandFactory';
import { IFileLocation } from '../Interfaces';

const BYE_MESSAGE = 'Bye... 👋';

const getAvailableDockerFiles = async () => {
  const terminalCommand = await factory().ListDockerComposeFiles('./');
  return terminalCommand.execute();
};

const pickDockerComposeFile = async (
  dockerFiles: IFileLocation[]
): Promise<string> => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'docker_compose_file',
      message: 'Select docker-compose file to run:',
      choices: dockerFiles.map(({ name, absolutePath }) => ({
        name,
        value: absolutePath,
      })),
    },
  ]);

  return answer.docker_compose_file;
};

const shouldRunDetached = async (): Promise<boolean> => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'runDetached',
      message: 'Pick mode:',
      choices: [
        { name: 'Attached', value: false },
        { name: 'Detached (-d)', value: true },
      ],
    },
  ]);

  return answer.runDetached;
};

const pickOperation = async (): Promise<string> => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'What would you like to do:',
      choices: [
        { name: 'Start', value: 'up' },
        { name: 'Stop', value: 'down' },
      ],
    },
  ]);

  return answer.operation;
};

async function runDockerComposeFile(): Promise<boolean> {
  try {
    const dockerFiles = await getAvailableDockerFiles();

    if (!Boolean(dockerFiles.length)) {
      console.info('No valid docker-compose files found');
      return;
    }

    const terminal = createTerminal();
    const file = await pickDockerComposeFile(dockerFiles);
    const operation = await pickOperation();

    if (operation === 'down') {
      await terminal.interactiveShell(`docker-compose -f ${file} down`);
      return true;
    }

    const detached = await shouldRunDetached();
    await terminal.interactiveShell(
      `docker-compose -f ${file} up ${detached ? '-d' : ''}`
    );

    console.log(BYE_MESSAGE);

    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}

export default {
  displayText: 'Run docker-compose file',
  callback: runDockerComposeFile,
};
