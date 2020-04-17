import createTerminal from '../../src/Services/Terminal';
import { NukeEverything } from '../../src/TerminalCommands/NukeEverything';

test('it can execute command with terminal', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn();

  const command = new NukeEverything(terminal);
  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith(
    'docker system prune --all --volumes --force'
  );
});
