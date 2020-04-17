export interface ITerminal {
  execute(command: string): Promise<string>;
  interactiveShell(command: string): Promise<string>;
}
export interface ITerminalCommand {
  toString(): Promise<string>;
  execute(): any;
}

export interface IContainer {
  name: string;
  id: string;
}
