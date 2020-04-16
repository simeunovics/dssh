import * as inquirer from 'inquirer';
import listRunningContainers from '../TerminalCommands/ListRunningContainers';
import attachToContainer from '../TerminalCommands/AttachToContainer';

const BYE_MESSAGE = 'Bye... 👋';
const PICK_USER_QUESTION = 'As user';
const PICK_CONTAINER_QUESTION = 'Attach to container';

const getRunningContainers = async () => {
  const terminalCommand = listRunningContainers();
  return terminalCommand.execute();
};

async function attachToRunningContainer(): Promise<Boolean> {
  try {
    const runningContainers = await getRunningContainers();

    if (!Boolean(runningContainers.length)) {
      console.info('No running containers found!');
      return;
    }

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

    const user = answers[PICK_USER_QUESTION];
    const command = attachToContainer({ containerId, user });

    await command.execute();
    console.log(BYE_MESSAGE);

    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
}

export default {
  displayText: 'Attach to running container',
  callback: attachToRunningContainer,
};
