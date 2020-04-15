import { exec, ExecException } from 'child_process';
import { ITerminalCommand, ITerminal } from '../Interfaces';

class Terminal implements ITerminal {
  public async execute(command: string): Promise<string> {
    return new Promise<string>((resolve: Function, reject: Function) => {
      exec(
        command,
        (
          error: ExecException | null,
          stdout: string,
          stderr: string
        ): string => {
          return error ? reject(stderr) : resolve(stdout);
        }
      );
    });
  }
}

export default () => new Terminal();
