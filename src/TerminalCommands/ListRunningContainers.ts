import { IContainer } from '../Interfaces';
import { TerminalCommand } from './TerminalCommand';

export class ListRunningContainers extends TerminalCommand {
  public async execute(): Promise<IContainer[]> {
    const response = await this.terminal.execute(
      `docker ps --format '{{.ID}}\t{{.Names}}'`
    );

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
