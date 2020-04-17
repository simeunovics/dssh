import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

export class AttachToContainer implements ITerminalCommand {
  public constructor(
    private terminal: ITerminal = terminal,
    private containerId: string,
    private user: string
  ) {}

  private toString() {
    return `docker exec --user ${this.user} -it ${this.containerId} bash`;
  }

  public async execute(): Promise<void> {
    const command = this.toString();

    await this.terminal.interactiveShell(command);
  }
}
