import createCommand from '../TerminalCommands/NukeEverything';

async function dockerStop(): Promise<Boolean> {
  try {
    const command = createCommand();

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
