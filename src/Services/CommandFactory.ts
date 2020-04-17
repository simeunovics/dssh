import createTerminalInstance from './Terminal';
import { AttachToContainer } from '../TerminalCommands/AttachToContainer';
import { ListRunningContainers } from '../TerminalCommands/ListRunningContainers';
import { NukeEverything } from '../TerminalCommands/NukeEverything';
import { StopContainers } from '../TerminalCommands/StopContainers';

class Factory {
  public constructor(private terminal = createTerminalInstance()) {}

  public async ListRunningContainers(): Promise<ListRunningContainers> {
    return new ListRunningContainers(this.terminal);
  }

  public async NukeEverything(): Promise<NukeEverything> {
    return new NukeEverything(this.terminal);
  }

  public async StopContainers(): Promise<StopContainers> {
    return new StopContainers(this.terminal);
  }

  public async AttachToContainer(options: {
    containerId: string;
    user: string;
  }): Promise<AttachToContainer> {
    const { containerId, user } = options;
    return new AttachToContainer(this.terminal, containerId, user);
  }
}

export const factory = () => {
  return new Factory();
};
