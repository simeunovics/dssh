interface Task {
  displayText: string;
  callback: () => Promise<Boolean>;
}
import attachToRunningContainer from "./attachToRunningContainer";
import dockerStop from "./dockerStop";
import dockerNuke from "./dockerNuke";

const tasks: Task[] = [
  attachToRunningContainer,
  dockerStop,
  dockerNuke
]

export default tasks;