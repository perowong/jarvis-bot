import { Configuration, OpenAIApi } from "openai";
import { readConf } from "./conf.js";
import HttpsProxyAgent from "https-proxy-agent";
import { log } from "wechaty";

const conf = await readConf();

const configuration = new Configuration({
  organization: conf["openaiOrgKey"],
  apiKey: conf["openaiApiKey"]
});

export const openai = new OpenAIApi(configuration);

const httpAgent = HttpsProxyAgent(`http://${conf["proxy"]}`);
try {
  const completion = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: "Who won the world series in 2020?"
      }],
      max_tokens: conf["conversationMaxTokens"]
    },
    {
      httpAgent: httpAgent,
      httpsAgent: httpAgent
    }
  );
  log.info(completion.data.choices[0]?.message?.content as string);
} catch (error: any) {
  if (error.response) {
    log.error("[gpt]", error.response.status);
    log.error("[gpt]", JSON.stringify(error.response.data));
  } else {
    log.error("[gpt]", error.message);
  }
}
