import createTerminal from '../../src/Services/Terminal';
import { AttachToContainer } from '../../src/TerminalCommands/AttachToContainer';

test('it can attach to running container', async () => {
  const terminal = createTerminal();
  terminal.interactiveShell = jest.fn(async () => 'done');

  const command = new AttachToContainer(terminal, '123123123', 'root');
  await command.execute();

  expect(terminal.interactiveShell).toBeCalledTimes(1);
  expect(terminal.interactiveShell).toBeCalledWith(
    'docker exec --user root -it 123123123 bash'
  );
});
