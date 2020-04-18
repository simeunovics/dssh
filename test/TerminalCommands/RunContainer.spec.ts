import createTerminal from '../../src/Services/Terminal';
import { RunContainer } from '../../src/TerminalCommands/RunContainer';

test('it can execute command', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn();

  const command = new RunContainer(terminal, 'node');
  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith('docker run -it node /bin/bash');
});
