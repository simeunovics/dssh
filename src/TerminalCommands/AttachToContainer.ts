import { ITerminal } from '../Interfaces';
import { TerminalCommand } from './TerminalCommand';

export class AttachToContainer extends TerminalCommand {
  public constructor(
    terminal: ITerminal,
    private containerId: string,
    private user: string
  ) {
    super(terminal);
  }

  public async execute(): Promise<void> {
    const command = this.toString();

    await this.terminal.interactiveShell(command);
  }

  private toString() {
    return `docker exec --user ${this.user} -it ${this.containerId} bash`;
  }
}
