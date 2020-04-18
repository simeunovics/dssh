import * as inquirer from 'inquirer';
import chalk from 'chalk';
import autocomplete from 'inquirer-autocomplete-prompt';
import { factory } from '../Services/CommandFactory';

inquirer.registerPrompt('autocomplete', autocomplete);
const searchImages = async (query) => {
  const command = await factory().DockerImageSearch(query);

  return await command.execute();
};

const getDisplayText = (image) => {
  return `${image.isOfficial ? chalk.green('·') : chalk.grey('·')} ${chalk.bold(
    image.name
  )} ${image.description}`;
};

const pickContainer = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'container_to_run',
      message: 'Select container to run',
      source: async function (_, input) {
        if (!Boolean(input)) {
          return [];
        }

        const images = await searchImages(input);
        return images.map((image) => ({
          name: getDisplayText(image),
          value: image.name,
        }));
      },
    },
  ]);

  return answer.container_to_run;
};

async function runContainer() {
  try {
    const container = await pickContainer();
    const runContainerCommand = await factory().RunContainer(container);
    await runContainerCommand.execute();

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default {
  displayText: 'SSH into arbitrary container.',
  callback: runContainer,
};
