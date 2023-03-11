import { log } from "wechaty";
import type { Message, Sayable } from "wechaty";
import type { WechatyInterface } from "wechaty/impls";
import { openai, httpAgent } from "./gpt.js";
import { readConf } from "./conf.js";

const conf = await readConf();

export interface JarvisParams {
  msg: Message
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
    const completion = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: toGptText
        }],
        max_tokens: conf["conversationMaxTokens"]
      },
      {
        httpAgent: httpAgent,
        httpsAgent: httpAgent
      }
    );
    replyMsg = completion.data.choices[0]?.message?.content as string;
  } catch (error: any) {
    if (error.response) {
      log.error(funcName, error.response.status);
      log.error(funcName, JSON.stringify(error.response.data));
    } else {
      log.error(funcName, error.message);
    }
  }

  msg.say(conf["singleChatReplyPrefix"] + replyMsg);
}
