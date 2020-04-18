import { IContainer, ITerminal } from '../Interfaces';
import { TerminalCommand } from './TerminalCommand';
import { TabulatedTable } from '../Services/TabulatedTable';

export class ListRunningContainers extends TerminalCommand {
  public constructor(
    terminal: ITerminal,
    private getTabulatedData: (data: string) => TabulatedTable
  ) {
    super(terminal);
  }
  public async execute(): Promise<IContainer[]> {
    const response = await this.terminal.execute(
      `docker ps --format '{{.ID}}\t{{.Names}}'`
    );

    return this.getTabulatedData(response).mapRows(this.containerFromString);
  }

  private containerFromString(containerDSN: string[]): IContainer {
    const [id, name] = containerDSN;

    return {
      id: id.trim(),
      name: name.trim(),
    };
  }
}
