import { TerminalCommand } from './TerminalCommand';
import { ITerminal, IFileLocation } from '../Interfaces';
import { FileSystem } from '../Services/FileSystem';

export class ListDockerComposeFiles extends TerminalCommand {
  public constructor(
    terminal: ITerminal,
    private fileSystem: FileSystem,
    private directoryPath: string
  ) {
    super(terminal);
  }

  public async execute(): Promise<IFileLocation[]> {
    const allFiles = await this.fileSystem.listFiles(this.directoryPath);

    const filesWithValidFlag = await Promise.all(
      allFiles.map(async (file) => {
        return {
          ...file,
          isValid: await this.isValidDockerFile(file.absolutePath),
        };
      })
    );

    return filesWithValidFlag
      .filter((file) => file.isValid)
      .map((file) => ({
        name: file.name,
        absolutePath: file.absolutePath,
      }));
  }

  private async isValidDockerFile(filePath: string): Promise<boolean> {
    try {
      await this.terminal.execute(`docker-compose -f ${filePath} config`);

      return true;
    } catch (e) {
      return false;
    }
  }
}
