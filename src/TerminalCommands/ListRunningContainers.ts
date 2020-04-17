import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal, IContainer } from '../Interfaces';

class ListRunningContainers implements ITerminalCommand {
  public constructor(private terminal: ITerminal = terminal) {}

  public async toString() {
    return `docker ps --format '{{.ID}}\t{{.Names}}'`;
  }

  public async execute(): Promise<IContainer[]> {
    const command = await this.toString();
    const response = await this.terminal.execute(command);

    const containers = response
      .trim()
      .split('\n')
      .filter((row) => Boolean(row.length))
      .map(this.containerFromString);

    return containers;
  }

  private containerFromString(containerDSN: string): IContainer {
    const [id, name] = containerDSN.split('\t');

    return {
      id: id.trim(),
      name: name.trim(),
    };
  }
}

export default (terminal?: ITerminal): ListRunningContainers => {
  const terminalInstance = terminal || createTerminalInstance();
  return new ListRunningContainers(terminalInstance);
};
