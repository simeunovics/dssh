import { TerminalCommand } from './TerminalCommand';

export class NukeEverything extends TerminalCommand {
  protected command = 'docker system prune --all --volumes --force';
}
