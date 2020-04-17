import createTerminal from '../../src/Services/Terminal';
import { ListRunningContainers } from '../../src/TerminalCommands/ListRunningContainers';

test('it can execute command with terminal', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn(async () => 'df21d3661f4f\tTest Container');

  const command = new ListRunningContainers(terminal);
  const response = await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith(
    `docker ps --format '{{.ID}}\t{{.Names}}'`
  );
  expect(response).toEqual([{ id: 'df21d3661f4f', name: 'Test Container' }]);
});
