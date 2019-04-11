import { exec, spawn, ExecException } from "child_process";

export async function shellExec(command: string) {
  return new Promise<string>((resolve: Function, reject: Function) => {
    exec(
      command,
      (error: ExecException | null, stdout: string, stderr: string): string => {
        return error ? reject(stderr) : resolve(stdout);
      }
    );
  });
}
