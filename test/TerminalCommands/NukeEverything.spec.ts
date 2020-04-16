import createTerminal from '../../src/Services/Terminal';
import createCommand from '../../src/TerminalCommands/NukeEverything';

test('it will clear all docker resources globally', async () => {
  const command = createCommand();

  expect(await command.toString()).toEqual(
    'docker system prune --all --volumes --force'
  );
});

test('it will have correct description', async () => {
  const command = createCommand();

  expect(await command.getDescription()).toEqual(
    'Wipe out all unused(stopped) docker resources. It will remove all containers, images, volumes, networks etc.'
  );
});

test('it can execute command with terminal', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn();

  const command = createCommand(terminal);
  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith(await command.toString());
});
