import path from "path";
import { fileURLToPath } from "url";
import { log } from "wechaty";
import { checkFileExists, readFile } from "./utils.js";

let conf: Record<string, any>;

export async function readConf() {
  if (conf) {
    return conf;
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const confPath = path.resolve(__dirname, "../conf.json");

  const isConfExist = await checkFileExists(confPath);
  if (!isConfExist) {
    log.error("[Abort]", 'A file named "conf.json" is required in the root path of your project');
    process.abort();
  }

  const f = (await readFile(confPath)) as string;
  conf = JSON.parse(f.trim());

  return conf;
}
