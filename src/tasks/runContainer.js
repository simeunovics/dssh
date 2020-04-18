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
  return `${image.isOfficial ? chalk.green(image.name) : image.name}`;
};

const pickContainer = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'container_to_run',
      message: 'Select container to run:',
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

const pickVersion = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: 'Select version',
      default: 'latest',
    },
  ]);

  return answer.version;
};

async function runContainer() {
  try {
    const container = await pickContainer();
    const version = await pickVersion();

    const runContainerCommand = await factory().RunContainer(
      `${container}:${version}`
    );
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
