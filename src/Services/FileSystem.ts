import { IFileLocation } from '../Interfaces';
import * as fs from 'fs';
import * as path from 'path';

export class FileSystem {
  public constructor(private disk = fs, private pathUtil = path) {}

  public async listFiles(dir: string): Promise<IFileLocation[]> {
    const absolutePath = this.getAbsolutePath(dir);

    const files: string[] = await new Promise((res, rej) => {
      this.disk.readdir(absolutePath, { withFileTypes: true }, (err, items) => {
        if (err) rej(err);

        const files = items
          .filter((item) => !item.isDirectory())
          .map(({ name }) => name);
        res(files);
      });
    });

    return files.map((file) => this.convertToFileLocation(absolutePath, file));
  }

  private getAbsolutePath(dir: string): string {
    if (this.pathUtil.isAbsolute(dir)) {
      return dir;
    }

    return this.pathUtil.resolve(dir);
  }

  private convertToFileLocation(
    absolutePath: string,
    fileName: string
  ): IFileLocation {
    const absolutePathToFile = this.pathUtil.join(absolutePath, fileName);

    return { absolutePath: absolutePathToFile };
  }
}

export default () => new FileSystem(fs, path);
