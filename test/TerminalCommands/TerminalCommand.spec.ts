import createTerminalInstance from '../../src/Services/Terminal';
import { TerminalCommand } from '../../src/TerminalCommands/TerminalCommand';

test('it will throw exception if execute method is not overridden', async () => {
  const terminal = createTerminalInstance();
  const command = new TerminalCommand(terminal);

  await expect(command.execute()).rejects.toThrow(
    `You must either override "execute" method or provide value for "command" property!`
  );
});

test('it will throw exception if execute method is not overridden', async () => {
  const terminal = createTerminalInstance();
  terminal.execute = jest.fn();

  const command = new (class extends TerminalCommand {
    protected command = 'ls';
  })(terminal);

  await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith('ls');
});
