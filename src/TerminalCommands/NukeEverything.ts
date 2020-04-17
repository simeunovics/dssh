import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

export class NukeEverything implements ITerminalCommand {
  private command: string = 'docker system prune --all --volumes --force';
  public constructor(private terminal: ITerminal = terminal) {}

  public async execute(): Promise<void> {
    await this.terminal.execute(this.command);
  }
}
