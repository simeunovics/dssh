import { factory } from '../../src/Services/CommandFactory';
import { AttachToContainer } from '../../src/TerminalCommands/AttachToContainer';
import { ListRunningContainers } from '../../src/TerminalCommands/ListRunningContainers';
import { NukeEverything } from '../../src/TerminalCommands/NukeEverything';
import { StopContainers } from '../../src/TerminalCommands/StopContainers';
import { DockerImageSearch } from '../../src/TerminalCommands/DockerImageSearch';
import { RunContainer } from '../../src/TerminalCommands/RunContainer';

test('it can create AttachToContainer command', async () => {
  const options = {
    containerId: 'dummy-container-id',
    user: 'root',
  };
  const command = await factory().AttachToContainer(options);

  expect(command).toBeInstanceOf(AttachToContainer);
});

test('it can create ListRunningContainers command', async () => {
  const command = await factory().ListRunningContainers();

  expect(command).toBeInstanceOf(ListRunningContainers);
});

test('it can create NukeEverything command', async () => {
  const command = await factory().NukeEverything();

  expect(command).toBeInstanceOf(NukeEverything);
});

test('it can create StopContainers command', async () => {
  const command = await factory().StopContainers();

  expect(command).toBeInstanceOf(StopContainers);
});

test('it can create DockerImageSearch command', async () => {
  const command = await factory().DockerImageSearch('image-name');

  expect(command).toBeInstanceOf(DockerImageSearch);
});

test('it can create RunContainer command', async () => {
  const command = await factory().RunContainer('image-name');

  expect(command).toBeInstanceOf(RunContainer);
});
