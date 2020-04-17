import { TerminalCommand } from './TerminalCommand';

export class NukeEverything extends TerminalCommand {
  private command: string = 'docker system prune --all --volumes --force';

  public async execute(): Promise<void> {
    await this.terminal.execute(this.command);
  }
}
