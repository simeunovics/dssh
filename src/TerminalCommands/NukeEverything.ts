import { TerminalCommand } from './TerminalCommand';

export class NukeEverything extends TerminalCommand {
  public async execute(): Promise<void> {
    await this.terminal.execute('docker system prune --all --volumes --force');
  }
}
