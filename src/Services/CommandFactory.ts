import createTerminalInstance from './Terminal';
import createFileSystem, { FileSystem } from './FileSystem';
import { AttachToContainer } from '../TerminalCommands/AttachToContainer';
import { ListRunningContainers } from '../TerminalCommands/ListRunningContainers';
import { NukeEverything } from '../TerminalCommands/NukeEverything';
import { StopContainers } from '../TerminalCommands/StopContainers';
import { DockerImageSearch } from '../TerminalCommands/DockerImageSearch';
import { ITerminal } from '../Interfaces';
import { RunContainer } from '../TerminalCommands/RunContainer';
import { ListDockerComposeFiles } from '../TerminalCommands/ListDockerComposeFiles';
import createTabulatedTable from '../Services/TabulatedTable';

export class Factory {
  public constructor(private terminal: ITerminal, private disk: FileSystem) {}

  public async ListRunningContainers(): Promise<ListRunningContainers> {
    return new ListRunningContainers(this.terminal, createTabulatedTable);
  }

  public async NukeEverything(): Promise<NukeEverything> {
    return new NukeEverything(this.terminal);
  }

  public async StopContainers(): Promise<StopContainers> {
    return new StopContainers(this.terminal);
  }

  public async DockerImageSearch(query: string): Promise<DockerImageSearch> {
    return new DockerImageSearch(this.terminal, query, createTabulatedTable);
  }

  public async RunContainer(image: string): Promise<RunContainer> {
    return new RunContainer(this.terminal, image);
  }

  public async ListDockerComposeFiles(
    directoryPath: string
  ): Promise<ListDockerComposeFiles> {
    return new ListDockerComposeFiles(this.terminal, this.disk, directoryPath);
  }

  public async AttachToContainer(options: {
    containerId: string;
    user: string;
  }): Promise<AttachToContainer> {
    const { containerId, user } = options;
    return new AttachToContainer(this.terminal, containerId, user);
  }
}

export const factory = (
  terminal: ITerminal = createTerminalInstance(),
  disk: FileSystem = createFileSystem()
) => {
  return new Factory(terminal, disk);
};
