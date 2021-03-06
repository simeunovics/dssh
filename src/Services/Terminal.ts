import { exec, ExecException, spawn } from 'child_process';
import { ITerminal } from '../Interfaces';

class Terminal implements ITerminal {
  public async execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        exec(
          command,
          (error: ExecException | null, stdout: string, stderr: string) => {
            error ? reject(stderr) : resolve(stdout);
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  public async interactiveShell(command: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const [program, ...args] = command.split(' ');

        const client = await spawn(program, args, {
          stdio: 'inherit',
          shell: true,
        });

        client.on('exit', resolve);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default () => new Terminal();
