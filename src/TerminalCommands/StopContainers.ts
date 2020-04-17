import { TerminalCommand } from './TerminalCommand';

export class StopContainers extends TerminalCommand {
  public async execute(): Promise<void> {
    await this.terminal.execute('docker stop $(docker ps -a -q)');
  }
}
