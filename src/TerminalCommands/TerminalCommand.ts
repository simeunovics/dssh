import { ITerminalCommand, ITerminal } from '../Interfaces';

export abstract class TerminalCommand implements ITerminalCommand {
  public constructor(protected terminal: ITerminal) {}

  public abstract execute(): any;
}
