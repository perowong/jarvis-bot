import readline from "readline";
import { log } from "wechaty";
import { readConf } from "./conf.js";
import { jarvis } from "./jarvis.js";
import { validateTerminalInput } from "./valid.js";

const conf = await readConf();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const logPrefix = `[${conf["chatPrefix"]}]`;

log.info(
  logPrefix,
  `
====ChatGPT start===

Text something with "${conf["chatPrefix"]}" like👇:
${conf["chatPrefix"]} Who won the world series in 2020?

====Waiting input====`
);

rl.on("line", async (str) => {
  const isTextValid = validateTerminalInput(str);
  if (!isTextValid) {
    return;
  }

  process.stdout.write("I'm thinking...\n");
  rl.pause();

  const reply = await jarvis(str);
  if (reply) {
    process.stdout.write(logPrefix + reply);
    process.stdout.write("\n\n====Waiting input====\n");
  }

  rl.resume();
});

rl.on("close", () => {
  log.info(logPrefix, "Bye👋, session closed.");
});
