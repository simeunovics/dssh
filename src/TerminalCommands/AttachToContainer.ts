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
    await this.terminal.interactiveShell(
      `docker exec --user ${this.user} -it ${this.containerId} bash`
    );
  }
}
