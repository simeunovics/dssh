import createTerminalInstance from './Terminal';
import { AttachToContainer } from '../TerminalCommands/AttachToContainer';
import { ListRunningContainers } from '../TerminalCommands/ListRunningContainers';
import { NukeEverything } from '../TerminalCommands/NukeEverything';
import { StopContainers } from '../TerminalCommands/StopContainers';

export enum Registered {
  AttachToContainer = 'AttachToContainer',
  ListRunningContainers = 'ListRunningContainers',
  NukeEverything = 'NukeEverything',
  StopContainers = 'StopContainers',
}

type CommandTypeConstructorMap = Record<
  Registered,
  (args?: any) => Promise<any>
>;

const ConstructorMap: CommandTypeConstructorMap = {
  [Registered.ListRunningContainers]: async (): Promise<
    ListRunningContainers
  > => {
    const terminal = createTerminalInstance();
    return new ListRunningContainers(terminal);
  },

  [Registered.AttachToContainer]: async (options: {
    containerId: string;
    user: string;
  }): Promise<AttachToContainer> => {
    const terminal = createTerminalInstance();
    const { containerId, user } = options;
    return new AttachToContainer(terminal, containerId, user);
  },

  [Registered.NukeEverything]: async (): Promise<NukeEverything> => {
    const terminal = createTerminalInstance();
    return new NukeEverything(terminal);
  },

  [Registered.StopContainers]: async (): Promise<StopContainers> => {
    const terminal = createTerminalInstance();
    return new StopContainers(terminal);
  },
};

export const factory = (command: Registered) => {
  const constructor = ConstructorMap[command];

  return { getInstance: constructor };
};
