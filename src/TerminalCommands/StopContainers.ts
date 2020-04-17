import { TerminalCommand } from './TerminalCommand';

export class StopContainers extends TerminalCommand {
  private command: string = 'docker stop $(docker ps -a -q)';

  public async execute(): Promise<void> {
    await this.terminal.execute(this.command);
  }
}
