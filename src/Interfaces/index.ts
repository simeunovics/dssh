export interface ITerminal {
  execute(command: string): Promise<string>;
}
export interface ITerminalCommand {
  toString(): Promise<string>;
  getDescription(): Promise<string>;
  execute(): any;
}

export interface IContainer {
  name: string;
  id: string;
}
