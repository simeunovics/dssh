interface ITask {
  displayText: string;
  callback: () => Promise<boolean>;
}
import attachToRunningContainer from './attachToRunningContainer';
import dockerStop from './dockerStop';
import dockerNuke from './dockerNuke';
import runContainer from './runContainer';
import runDockerCompose from './runDockerCompose';

const tasks: ITask[] = [
  attachToRunningContainer,
  dockerStop,
  dockerNuke,
  runContainer,
  runDockerCompose,
];

export default tasks;
