import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

class StopContainers implements ITerminalCommand {
  public constructor(private terminal: ITerminal = terminal) {}

  public async toString() {
    return 'docker stop $(docker ps -a -q)';
  }

  public async getDescription() {
    return 'Stop all running containers containers';
  }

  public async execute(): Promise<void> {
    const command = await this.toString();

    await this.terminal.execute(command);
  }
}

export default (terminal?: ITerminal): StopContainers => {
  const terminalInstance = terminal || createTerminalInstance();
  return new StopContainers(terminalInstance);
};
