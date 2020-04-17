import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

class StopContainers implements ITerminalCommand {
  private command: string = 'docker stop $(docker ps -a -q)';
  public constructor(private terminal: ITerminal = terminal) {}

  public async execute(): Promise<void> {
    await this.terminal.execute(this.command);
  }
}

export default (terminal?: ITerminal): StopContainers => {
  const terminalInstance = terminal || createTerminalInstance();
  return new StopContainers(terminalInstance);
};
