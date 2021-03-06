import { factory } from '../Services/CommandFactory';

async function dockerStop(): Promise<boolean> {
  try {
    const command = await factory().StopContainers();

    console.log('🛑 Stopping all containers...');
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
  displayText: 'Stop all running containers',
  callback: dockerStop,
};
