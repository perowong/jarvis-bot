import type { Message } from "wechaty";

enum LogLevel {
  silent = 0,
  error,
  warn,
  info,
  verbose,
  silly
}

let level: LogLevel | undefined;
const CHAT_LOG_MODE = "CHAT_LOG_MODE";

function getLevel() {
  if (typeof process !== "undefined" && process["env"]) {
    /**
     * Node.js
     */
    const chatLogMode = process.env[CHAT_LOG_MODE];
    if (!level && typeof chatLogMode === "string") {
      level = LogLevel[chatLogMode as any] as LogLevel | undefined;
    }
  }

  if (level === undefined) {
    level = LogLevel.error;
  }

  return level;
}

async function error(msg: Message, prefix: string, ...args: any[]) {
  if (getLevel() < LogLevel.error) {
    return;
  }

  return await msg.say(`ERROR ${prefix} ${args.join(" ")}`);
}

async function warn(msg: Message, prefix: string, ...args: any[]) {
  if (getLevel() < LogLevel.warn) {
    return;
  }

  return await msg.say(`WARN ${prefix} ${args.join(" ")}`);
}

async function info(msg: Message, prefix: string, ...args: any[]) {
  if (getLevel() < LogLevel.info) {
    return;
  }

  return await msg.say(`INFO ${prefix} ${args.join(" ")}`);
}

async function verbose(msg: Message, prefix: string, ...args: any[]) {
  if (getLevel() < LogLevel.verbose) {
    return;
  }

  return await msg.say(`VERBOSE ${prefix} ${args.join(" ")}`);
}

const ChatLog = {
  error,
  warn,
  info,
  verbose
};

export default ChatLog;
