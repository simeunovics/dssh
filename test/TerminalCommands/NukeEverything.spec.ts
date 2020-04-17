import createTerminal from '../../src/Services/Terminal';
import createCommand from '../../src/TerminalCommands/NukeEverything';

test('it can execute command with terminal', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn();

  const command = createCommand(terminal);
  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith(
    'docker system prune --all --volumes --force'
  );
});
