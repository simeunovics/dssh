import createTabulatedTable, {
  TabulatedTable,
} from '../../src/Services/TabulatedTable';

const STRINGIFIED_TABULATED_TABLE = `
php\tWhile designed for web development, the PHP …\t5192\t[OK]
phpmyadmin/phpmyadmin\tA web interface for MySQL and MariaDB.\t992\t\t[OK]
isotopab/php\tDocker PHP\t1\t[OK]\t
`;

test('it can be created form string', () => {
  const table = createTabulatedTable('');

  expect(table).toBeInstanceOf(TabulatedTable);
});

test('it can map through rows', () => {
  const table = createTabulatedTable(STRINGIFIED_TABULATED_TABLE);

  const rows = table.mapRows((row) => ({ value: row }));
  expect(rows).toEqual([
    {
      value: [
        'php',
        'While designed for web development, the PHP …',
        '5192',
        '[OK]',
      ],
    },
    {
      value: [
        'phpmyadmin/phpmyadmin',
        'A web interface for MySQL and MariaDB.',
        '992',
        '',
        '[OK]',
      ],
    },
    { value: ['isotopab/php', 'Docker PHP', '1', '[OK]', ''] },
  ]);
});
