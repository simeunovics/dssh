import { factory } from '../Services/CommandFactory';

async function dockerStop(): Promise<boolean> {
  try {
    const stopContainersCommand = await factory().StopContainers();
    await stopContainersCommand.execute();

    const command = await factory().NukeEverything();

    console.log('Removing EVERYTHING 💥');
    await command.execute();
    console.log('');
    console.log('✅ Done.');

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default {
  displayText: 'Stop and remove ALL containers and ALL images ⚠️',
  callback: dockerStop,
};
