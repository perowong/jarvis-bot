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
```bash
{
  "openaiOrgKey": "YOUR ORGANIZATION KEY",      # Required. Acquire it from [https://platform.openai.com/account/org-settings]
  "openaiApiKey": "YOUR API KEY",               # Required. Acquire it from [https://platform.openai.com/account/api-keys]
  "proxy": "",                                  # Proxy to a local vpn, like "http://127.0.0.1:1080"
  "baseURL": "",                                # If you have a proxy service to proxy the request of "api.openai.com", baseURL is a batter simple proxy alternative.
  "chatPrefix": "@Jarvis",                      # Required. The symbol command line recognize your input, you can named it as you like
  "conversationMaxTokens": 1024,                # If you don't want gpt give you infinity reply with your tokens exhausted, this is required.
  "characterDesc": "You are ChatGPT, a model trained by OpenAI that is designed to answer and solve any question people have, and can communicate with people in multiple languages."
}
```

Run:
```shell
npm run gpt
```

<img src="https://user-images.githubusercontent.com/44636561/224526617-2c4cf73a-a40d-40c6-b908-301c2de42e4f.png" width="500px" />

Feel free to use it. 🤖

## How to start in the WeChat

Make up your `conf.json`
```bash
{
  "wechatyPuppetToken": "YOUR WECHATY PUPPET TOKEN",       # Required. Acquire it from [http://pad-local.com/#/tokens]
  "openaiOrgKey": "YOUR ORGANIZATION KEY",                 # Required. Acquire it from [https://platform.openai.com/account/org-settings]
  "openaiApiKey": "YOUR API KEY",                          # Required. Acquire it from [https://platform.openai.com/account/api-keys]
  "proxy": "",                                             # Proxy to a local vpn, like "http://127.0.0.1:1080"
  "baseURL": "",                                           # If you have a proxy service to proxy the request of "api.openai.com", baseURL is a batter simple proxy alternative.
  "chatPrefix": "@Jarvis",                                 # Required. The symbol command line recognize your input, you can named it as you like
  "singleChatReplyPrefix": "[Jarvis] ",                    # Recognize the message is from ChatGPT
  "groupNameWhiteList": ["Chat@Jarvis", "ChatGPT@Jarvis"], # Required. Jarvis only reply you in these groups
  "conversationMaxTokens": 1024,                           # If you don't want gpt give you infinity reply with your tokens exhausted, this is required.
  "characterDesc": "You are ChatGPT, a model trained by OpenAI that is designed to answer and solve any question people have, and can communicate with people in multiple languages."
}
```

Run:
```shell
npm run start
```

Your will revice a WeChat login qrcode, and scan it

<img src="https://user-images.githubusercontent.com/44636561/224527142-3c567526-f254-4ccc-8fa1-e010cf2d804e.png" width="300px" />


Feel free to use it in your WeChat.😋

<img src="https://user-images.githubusercontent.com/44636561/224527160-91586b7d-4f53-4c9f-901c-e8084fed0cc9.png" width="300px" />
