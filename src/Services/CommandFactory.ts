import createTerminalInstance from './Terminal';
import { AttachToContainer } from '../TerminalCommands/AttachToContainer';
import { ListRunningContainers } from '../TerminalCommands/ListRunningContainers';
import { NukeEverything } from '../TerminalCommands/NukeEverything';
import { StopContainers } from '../TerminalCommands/StopContainers';
import { DockerImageSearch } from '../TerminalCommands/DockerImageSearch';
import { ITerminal } from '../Interfaces';
import { RunContainer } from '../TerminalCommands/RunContainer';
import createTabulatedTable from '../Services/TabulatedTable';

export class Factory {
  public constructor(private terminal: ITerminal) {}

  public async ListRunningContainers(): Promise<ListRunningContainers> {
    return new ListRunningContainers(this.terminal);
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

  public async AttachToContainer(options: {
    containerId: string;
    user: string;
  }): Promise<AttachToContainer> {
    const { containerId, user } = options;
    return new AttachToContainer(this.terminal, containerId, user);
  }
}

export const factory = (terminal: ITerminal = createTerminalInstance()) => {
  return new Factory(terminal);
};
