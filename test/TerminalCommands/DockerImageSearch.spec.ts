import createTerminal from '../../src/Services/Terminal';
import { DockerImageSearch } from '../../src/TerminalCommands/DockerImageSearch';

test('it can execute command', async () => {
  const terminal = createTerminal();
  terminal.execute = jest.fn(
    async () => `node	Node.js is a JavaScript-based platform for s…	8714	[OK]`
  );

  const command = new DockerImageSearch(terminal, 'node');
  const result = await command.execute();

  expect(terminal.execute).toBeCalledTimes(1);
  expect(terminal.execute).toBeCalledWith(
    `docker search node --format '{{.Name}}\t{{.Description}}\t{{.StarCount}}\t{{.IsOfficial}}\t{{.IsAutomated}}'`
  );

  expect(result).toEqual([
    {
      name: 'node',
      description: 'Node.js is a JavaScript-based platform for s…',
      starCount: 8714,
      isOfficial: true,
      isAutomated: false,
    },
  ]);
});
