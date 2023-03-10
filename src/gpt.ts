#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { Configuration, OpenAIApi } from "openai";
// import axios from 'axios';
import { log } from "wechaty-puppet";
import { readConf } from "./conf.js";

const conf = await readConf();

const configuration = new Configuration({
  organization: conf["openaiOrgKey"],
  apiKey: conf["openaiApiKey"]
});

// const gptAxios = axios.create({
//   proxy: {
//     host: "127.0.0.1",
//     port: 1080,
//     protocol: "socket5"
//   },
//   timeout: 5000
// });

export const openai = new OpenAIApi(configuration);

const [host, port] = conf["proxy"].split(":");
try {
  const completion = await openai.createCompletion(
    {
      model: "gpt-3.5-turbo",
      prompt: "Hello world"
    },
    {
      proxy: {
        host,
        port,
        protocol: "socket5"
      },
      timeout: 5000
    }
  );
  log.info(completion.data.choices[0]?.text as string);
} catch (error: any) {
  if (error.response) {
    log.error(error.response.status);
    log.error(error.response.data);
  } else {
    log.error(error.message);
  }
}
