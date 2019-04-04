import { shellExec } from "./helpers";

export default async function dockerStop(): Promise<Boolean> {
  try {
    await shellExec("docker stop $(docker ps -a -q);");
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
