import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

export class AttachToContainer implements ITerminalCommand {
  public constructor(
    private terminal: ITerminal = terminal,
    private containerId: string,
    private user: string
  ) {}

  private toString() {
    return `docker exec --user ${this.user} -it ${this.containerId} bash`;
  }

  public async execute(): Promise<void> {
    const command = this.toString();

    await this.terminal.interactiveShell(command);
  }
}

export default (
  options: { containerId: string; user: string },
  terminal?: ITerminal
): AttachToContainer => {
  const terminalInstance = terminal || createTerminalInstance();
  const { user, containerId } = options;
  return new AttachToContainer(terminalInstance, containerId, user);
};
