import { ITerminalCommand, ITerminal } from '../Interfaces';

export class TerminalCommand implements ITerminalCommand {
  protected command?: string;
  public constructor(protected terminal: ITerminal) {}

  public async execute(): Promise<any> {
    if (this.command === undefined) {
      throw new TypeError(
        `You must either override "execute" method or provide value for "command" property!`
      );
    }

    await this.terminal.execute(this.command);
  }
}
