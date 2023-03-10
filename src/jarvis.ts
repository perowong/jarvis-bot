import { log, Message, Sayable } from "wechaty";
import type { WechatyInterface } from "wechaty/impls";
import { openai } from "./gpt.js";
import { readConf } from "./conf.js";

const conf = await readConf();

export interface JarvisParams {
  msg: Message;
  bot?: WechatyInterface;
}

export async function jarvis({ msg }: JarvisParams) {
  const funcName = "[jarvis]";
  const text = msg.text();
  const room = msg.room();

  if (!text.includes(conf["chatPrefix"])) {
    return;
  }

  if (room) {
    const topic = await room.topic();
    if (conf["groupNameWhiteList"].includes(topic)) {
      return;
    }
  }

  const [namePrefix, ...rest] = text.split(conf["chatPrefix"]);
  if (namePrefix !== "") {
    return;
  }

  let replyMsg: Sayable = "Something wrong";
  const toGptText = rest.join("");

  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: toGptText
    });

    replyMsg = completion.data.choices[0]?.text as string;
  } catch (error: any) {
    if (error.response) {
      log.error(funcName, error.response.status);
      log.error(funcName, error.response.data);
    } else {
      log.error(funcName, error.message);
    }
  }

  msg.say(conf["singleChatReplyPrefix"] + replyMsg);
}
