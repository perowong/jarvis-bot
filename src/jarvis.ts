import type { Sayable } from "wechaty";
import { log } from "wechaty";
import { readConf } from "./conf.js";
import { httpAgent, openai } from "./gpt.js";

const conf = await readConf();

export async function jarvis(text: string) {
  const funcName = "[jarvis]";
  const s = text.split(conf["chatPrefix"]);

  let replyMsg: Sayable = "Something wrong";
  const toGptText = s.join("");

  try {
    const completion = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: toGptText
          }
        ],
        max_tokens: conf["conversationMaxTokens"]
      },
      {
        httpAgent: httpAgent,
        httpsAgent: httpAgent
      }
    );
    replyMsg = completion.data.choices[0]?.message?.content as Sayable;
  } catch (error: any) {
    if (error.response) {
      log.error(funcName, error.response.status);
      log.error(funcName, JSON.stringify(error.response.data));
    } else {
      log.error(funcName, error.message);
    }
  }

  return replyMsg;
}
