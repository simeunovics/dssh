import { TerminalCommand } from './TerminalCommand';
import { ITerminal } from '../Interfaces';

export class RunContainer extends TerminalCommand {
  public constructor(terminal: ITerminal, private image: string) {
    super(terminal);
  }

  public async execute(): Promise<void> {
    await this.terminal.interactiveShell(
      `docker run -it ${this.image} /bin/bash`
    );
  }
}
