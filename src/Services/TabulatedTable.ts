export class TabulatedTable {
  private rows: string[][] = [];

  public constructor(private data: string) {
    this.rows = this.data
      .split('\n')
      .filter((row: string) => Boolean(row.trim()))
      .map((row: string) => row.split('\t'));
  }

  public mapRows<T>(callback: (row: string[]) => T) {
    return this.rows.map(callback);
  }
}

export default (data: string) => new TabulatedTable(data);
