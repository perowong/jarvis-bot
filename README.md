# Jarvis Bot With ChatGPT

This is a project that uses openai-node API and Wechaty to build a bot in the WeChat.  
Basically, you can also use it in your command terminal.

## Installation

```shell
npm i
```

## How to use in the command terminal

Copy the conf-template.json to conf.json

```shell
copy conf-template.json conf.json
```

Make up your `conf.json`
```json
{
  "openaiOrgKey"         : "YOUR ORGANIZATION KEY",           # Required. Access if from [https://platform.openai.com/account/org-settings]
  "openaiApiKey"         : "YOUR API KEY",                    # Required. Access it from [https://platform.openai.com/account/api-keys]
  "proxy"                : "",                                # Proxy to a local vpn, like "http://127.0.0.1:1080"
  "baseURL"              : "",                                # If you have a proxy service to proxy the request of "api.openai.com", baseURL is a batter simple proxy alternative.
  "chatPrefix"           : "@Jarvis",                         # Required. The symbol command line recognize your input, you can named it as you like
  "conversationMaxTokens": 1024,                              # If you don't want gpt give you infinity reply with your tokens exhausted, this is required.
  "characterDesc": "You are ChatGPT, a model trained by OpenAI that is designed to answer and solve any question people have, and can communicate with people in multiple languages."
}
```

Run:
```shell
npm run gpt
```

Feel free to use it.

## How to start in the WeChat

...
