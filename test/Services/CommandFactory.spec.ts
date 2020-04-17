import { factory, Registered } from '../../src/Services/CommandFactory';
import { AttachToContainer } from '../../src/TerminalCommands/AttachToContainer';
import { ListRunningContainers } from '../../src/TerminalCommands/ListRunningContainers';
import { NukeEverything } from '../../src/TerminalCommands/NukeEverything';
import { StopContainers } from '../../src/TerminalCommands/StopContainers';

test('it can create AttachToContainer command', async () => {
  const options = {
    containerId: 'dummy-container-id',
    user: 'root',
  };
  const command = await factory(Registered.AttachToContainer).getInstance(
    options
  );

  expect(command).toBeInstanceOf(AttachToContainer);
});

test('it can create ListRunningContainers command', async () => {
  const command = await factory(Registered.ListRunningContainers).getInstance();

  expect(command).toBeInstanceOf(ListRunningContainers);
});

test('it can create NukeEverything command', async () => {
  const command = await factory(Registered.NukeEverything).getInstance();

  expect(command).toBeInstanceOf(NukeEverything);
});

test('it can create StopContainers command', async () => {
  const command = await factory(Registered.StopContainers).getInstance();

  expect(command).toBeInstanceOf(StopContainers);
});
