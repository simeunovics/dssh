export interface ITerminal {
  execute(command: string): Promise<string>;
  interactiveShell(command: string): Promise<string>;
}
export interface ITerminalCommand {
  execute(): any;
}

export interface IContainer {
  name: string;
  id: string;
}

export interface IDockerImage {
  name: string;
  description: string;
  starCount: number;
  isOfficial: boolean;
  isAutomated: boolean;
}

export interface IFileLocation {
  absolutePath: string;
  name: string;
}
