interface ITask {
  displayText: string;
  callback: () => Promise<Boolean>;
}
import attachToRunningContainer from './attachToRunningContainer';
import dockerStop from './dockerStop';
import dockerNuke from './dockerNuke';

const tasks: ITask[] = [attachToRunningContainer, dockerStop, dockerNuke];

export default tasks;
