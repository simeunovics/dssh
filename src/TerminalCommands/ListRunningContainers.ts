import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal, IContainer } from '../Interfaces';

export class ListRunningContainers implements ITerminalCommand {
  private command: string = `docker ps --format '{{.ID}}\t{{.Names}}'`;

  public constructor(private terminal: ITerminal = terminal) {}

  public async execute(): Promise<IContainer[]> {
    const response = await this.terminal.execute(this.command);

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
