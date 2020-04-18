import createTerminal from '../../src/Services/Terminal';
import { RunContainer } from '../../src/TerminalCommands/RunContainer';

test('it can execute command', async () => {
  const terminal = createTerminal();
  terminal.interactiveShell = jest.fn();

  const command = new RunContainer(terminal, 'node');
  await command.execute();

  expect(terminal.interactiveShell).toBeCalledTimes(1);
  expect(terminal.interactiveShell).toBeCalledWith(
    'docker run -it node /bin/bash'
  );
});
