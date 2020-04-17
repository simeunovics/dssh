import createTerminalInstance from './Terminal';
import { AttachToContainer } from '../TerminalCommands/AttachToContainer';
import { ListRunningContainers } from '../TerminalCommands/ListRunningContainers';
import { NukeEverything } from '../TerminalCommands/NukeEverything';
import { StopContainers } from '../TerminalCommands/StopContainers';

export enum Commands {
  AttachToContainer = 'AttachToContainer',
  ListRunningContainers = 'ListRunningContainers',
  NukeEverything = 'NukeEverything',
  StopContainers = 'StopContainers',
}

type CommandTypeConstructorMap = Record<Commands, (args?: any) => Promise<any>>;

const ConstructorMap: CommandTypeConstructorMap = {
  [Commands.ListRunningContainers]: async (): Promise<
    ListRunningContainers
  > => {
    const terminal = createTerminalInstance();
    return new ListRunningContainers(terminal);
  },

  [Commands.AttachToContainer]: async (options: {
    containerId: string;
    user: string;
  }): Promise<AttachToContainer> => {
    const terminal = createTerminalInstance();
    const { containerId, user } = options;
    return new AttachToContainer(terminal, containerId, user);
  },

  [Commands.NukeEverything]: async (): Promise<NukeEverything> => {
    const terminal = createTerminalInstance();
    return new NukeEverything(terminal);
  },

  [Commands.StopContainers]: async (): Promise<StopContainers> => {
    const terminal = createTerminalInstance();
    return new StopContainers(terminal);
  },
};

export const factory = (command: Commands) => {
  const constructor = ConstructorMap[command];

  return { getInstance: constructor };
};
