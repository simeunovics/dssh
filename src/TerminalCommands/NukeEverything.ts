import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

class NukeEverything implements ITerminalCommand {
  public constructor(private terminal: ITerminal = terminal) {}

  public async toString() {
    return 'docker system prune --all --volumes --force';
  }

  public async getDescription() {
    return 'Wipe out all unused(stopped) docker resources. It will remove all containers, images, volumes, networks etc.';
  }

  public async execute(): Promise<void> {
    const command = await this.toString();

    await this.terminal.execute(command);
  }
}

export default (terminal?: ITerminal): NukeEverything => {
  const terminalInstance = terminal || createTerminalInstance();
  return new NukeEverything(terminalInstance);
};