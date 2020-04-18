import { ITerminal, IDockerImage } from '../Interfaces';
import { TerminalCommand } from './TerminalCommand';
import { TabulatedTable } from '../Services/TabulatedTable';

export class DockerImageSearch extends TerminalCommand {
  public constructor(
    terminal: ITerminal,
    private query: string,
    private getTabulatedData: (data: string) => TabulatedTable
  ) {
    super(terminal);
  }

  public async execute(): Promise<IDockerImage[]> {
    const format =
      '{{.Name}}\t{{.Description}}\t{{.StarCount}}\t{{.IsOfficial}}\t{{.IsAutomated}}';

    const result = await this.terminal.execute(
      `docker search ${this.query.trim()} --format '${format}'`
    );

    return this.getTabulatedData(result).mapRows(this.convertDSNToImage);
  }

  private convertDSNToImage(imageDSN: string[]): IDockerImage {
    const [name, description, starCount, isOfficial, isAutomated] = imageDSN;

    return {
      name,
      description,
      starCount: Number(starCount),
      isOfficial: isOfficial === '[OK]',
      isAutomated: isAutomated === '[OK]',
    };
  }
}
