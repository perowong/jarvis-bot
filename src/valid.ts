import type { Message } from "wechaty";
import { readConf } from "./conf.js";

const conf = await readConf();

export async function validateWechatyMsg(msg: Message) {
  const text = msg.text();
  const room = msg.room();

  if (!text.includes(conf["chatPrefix"])) {
    return false;
  }

  if (room) {
    const topic = await room.topic();
    if (!conf["groupNameWhiteList"].includes(topic)) {
      return false;
    }
  }

  return true;
}

export function validateTerminalInput(text: string) {
  return text.includes(conf["chatPrefix"]);
}
