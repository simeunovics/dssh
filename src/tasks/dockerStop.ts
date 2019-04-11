import { shellExec } from "../helpers";

async function dockerStop(): Promise<Boolean> {
  try {
    console.log("🛑 Stopping all containers...");
    const response = await shellExec("docker stop $(docker ps -a -q);");
    console.log("");
    console.log(response);
    console.log("✅ Done.");
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default {
  displayText: "Stop all running containers",
  callback: dockerStop
}
