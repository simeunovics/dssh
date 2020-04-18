interface ITask {
  displayText: string;
  callback: () => Promise<boolean>;
}
import attachToRunningContainer from './attachToRunningContainer';
import dockerStop from './dockerStop';
import dockerNuke from './dockerNuke';
import runContainer from './runContainer';

const tasks: ITask[] = [
  attachToRunningContainer,
  dockerStop,
  dockerNuke,
  runContainer,
];

export default tasks;
