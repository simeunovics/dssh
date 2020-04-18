import { ITerminal, IDockerImage } from '../Interfaces';
import { TerminalCommand } from './TerminalCommand';

export class DockerImageSearch extends TerminalCommand {
  public constructor(terminal: ITerminal, private query: string) {
    super(terminal);
  }
  public async execute(): Promise<IDockerImage[]> {
    const format =
      '{{.Name}}\t{{.Description}}\t{{.StarCount}}\t{{.IsOfficial}}\t{{.IsAutomated}}';
    const result = await this.terminal.execute(
      `docker search ${this.query.trim()} --format '${format}'`
    );
    const images = result
      .trim()
      .split('\n')
      .filter((row) => Boolean(row.length))
      .map(this.convertDSNToImage);

    return images;
  }

  private convertDSNToImage(imageDSN: string): IDockerImage {
    const [
      name,
      description,
      starCount,
      isOfficial,
      isAutomated,
    ] = imageDSN.split('\t');

    return {
      name,
      description,
      starCount: Number(starCount),
      isOfficial: isOfficial === '[OK]',
      isAutomated: isAutomated === '[OK]',
    };
  }
}
