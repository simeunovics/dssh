import createTerminalInstance from '../../src/Services/Terminal';
import createFileSystem from '../../src/Services/FileSystem';
import { ListDockerComposeFiles } from '../../src/TerminalCommands/ListDockerComposeFiles';

test('it can list docker-compose files in current directory', async () => {
  const terminal = createTerminalInstance();
  terminal.execute = jest.fn(async (command: string) => {
    if (command.includes('/test/b')) {
      throw new Error();
    }
    return '';
  });

  const disk = createFileSystem();
  disk.listFiles = jest.fn(async () => [
    { absolutePath: '/test/a' },
    { absolutePath: '/test/b' },
  ]);

  const command = new ListDockerComposeFiles(terminal, disk, './');
  const files = await command.execute();

  expect(files).toEqual([{ absolutePath: '/test/a' }]);
  expect(terminal.execute).toBeCalledTimes(2);
  expect(terminal.execute).toBeCalledWith('docker-compose -f /test/a config');
  expect(terminal.execute).toBeCalledWith('docker-compose -f /test/b config');
});
