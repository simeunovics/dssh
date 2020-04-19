import { FileSystem } from '../../src/Services/FileSystem';

test('it can list directory for files', async () => {
  const path: any = jest.genMockFromModule('path');
  path.isAbsolute = jest.fn(() => true);
  path.join = jest.fn((a, b) => `${a}/${b}`);

  const fs: any = jest.genMockFromModule('fs');
  fs.readdir = (_: any, options: any, callback: any) => {
    callback(null, [
      { isDirectory: () => false, name: 'a' },
      { isDirectory: () => false, name: 'b' },
    ]);
  };

  const fileSystem = new FileSystem(fs, path);
  const files = await fileSystem.listFiles('dummy-folder');

  expect(files.length).toEqual(2);
  expect(files).toEqual([
    { absolutePath: 'dummy-folder/a', name: 'a' },
    { absolutePath: 'dummy-folder/b', name: 'b' },
  ]);
});
