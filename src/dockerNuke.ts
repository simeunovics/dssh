import { shellExec } from "./helpers";

export default async function dockerStop(): Promise<Boolean> {
  try {
    console.log("Removing EVERYTHING 💥");
    const response = await shellExec(
      "docker stop $(docker ps -a -q); docker rm $(docker ps -a -q); docker rmi -f $(docker images -a -q)"
    );
    console.log("");
    console.log(response);
    console.log("✅ Done.");
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
