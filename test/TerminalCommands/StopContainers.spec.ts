import createTerminal from '../../src/Services/Terminal';
import { StopContainers } from '../../src/TerminalCommands/StopContainers';

test('it can execute command', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn();

  const command = new StopContainers(terminal);
  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith('docker stop $(docker ps -a -q)');
});
