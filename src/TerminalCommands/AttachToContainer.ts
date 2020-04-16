import createTerminalInstance from '../Services/Terminal';
import { ITerminalCommand, ITerminal } from '../Interfaces';

class AttachToContainer implements ITerminalCommand {
  public constructor(
    private terminal: ITerminal = terminal,
    private containerId: string,
    private user: string
  ) {}

  public async toString() {
    return `docker exec --user ${this.user} -it ${this.containerId} bash`;
  }

  public async getDescription() {
    return 'Attach to running container.';
  }

  public async execute(): Promise<void> {
    const command = await this.toString();

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
