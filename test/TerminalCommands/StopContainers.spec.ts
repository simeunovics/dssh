import createTerminal from '../../src/Services/Terminal';
import createCommand from '../../src/TerminalCommands/StopContainers';

test('it will return correct stringified command', async () => {
  const command = createCommand();

  expect(await command.toString()).toEqual('docker stop $(docker ps -a -q)');
});

test('it can execute command', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn();

  const command = createCommand(terminal);
  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith(await command.toString());
});
