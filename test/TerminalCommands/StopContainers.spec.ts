import createTerminal from '../../src/Services/Terminal';
import createCommand from '../../src/TerminalCommands/StopContainers';

test('it will return correct stringified command', async () => {
  const command = createCommand();

  expect(await command.toString()).toEqual('docker stop $(docker ps -a -q)');
});

test('it will return proper description', async () => {
  const command = createCommand();

  expect(await command.getDescription()).toEqual(
    'Stop all running containers containers'
  );
});

test('it can execute command', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn();

  const command = createCommand(terminal);
  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith(await command.toString());
});
