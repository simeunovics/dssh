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
    const files = await this.fileSystem.listFiles(this.directoryPath);

    const validFiles = [];
    for (const file of files) {
      if (await this.isValidDockerFile(file.absolutePath)) {
        validFiles.push(file);
      }
    }

    return validFiles;
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
