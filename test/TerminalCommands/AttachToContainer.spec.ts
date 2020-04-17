import createTerminal from '../../src/Services/Terminal';
import createCommand from '../../src/TerminalCommands/AttachToContainer';

test('it will list all currently running containers', async () => {
  const command = createCommand({
    user: 'root',
    containerId: '123123123',
  });

  expect(await command.toString()).toEqual(
    'docker exec --user root -it 123123123 bash'
  );
});

test('it can attach to running container', async () => {
  const terminal = createTerminal();
  terminal.interactiveShell = jest.fn(async () => 'done');

  const command = createCommand(
    {
      user: 'root',
      containerId: '123123123',
    },
    terminal
  );
  await command.execute();

  expect(terminal.interactiveShell).toBeCalledTimes(1);
  expect(terminal.interactiveShell).toBeCalledWith(await command.toString());
});
