import { TerminalCommand } from './TerminalCommand';

export class StopContainers extends TerminalCommand {
  protected command = 'docker stop $(docker ps -a -q)';
}
