import HttpsProxyAgent from "https-proxy-agent";
import { Configuration, OpenAIApi } from "openai";
import { readConf } from "./conf.js";

const conf = await readConf();

const configuration = new Configuration({
  organization: conf["openaiOrgKey"],
  apiKey: conf["openaiApiKey"],
  basePath: conf["baseURL"] || undefined
});

export const openai = new OpenAIApi(configuration);
export const httpAgent = conf["proxy"] ? HttpsProxyAgent(conf["proxy"]) : undefined;
