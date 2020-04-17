import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

export class StopContainers implements ITerminalCommand {
  private command: string = 'docker stop $(docker ps -a -q)';
  public constructor(private terminal: ITerminal = terminal) {}

  public async execute(): Promise<void> {
    await this.terminal.execute(this.command);
  }
}
