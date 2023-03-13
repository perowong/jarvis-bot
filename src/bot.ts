#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import "dotenv/config.js";

import qt from "qrcode-terminal";
import { Contact, log, Message, ScanStatus, WechatyBuilder } from "wechaty";
import PuppetPadlocal from "wechaty-puppet-padlocal";

import { readConf } from "./conf.js";
import { jarvis } from "./jarvis.js";
import { validateWechatyMsg } from "./valid.js";

const conf = await readConf();

const puppet = new PuppetPadlocal({
  token: conf["wechatyPuppetToken"]
});

function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = ["https://wechaty.js.org/qrcode/", encodeURIComponent(qrcode)].join("");
    log.info("StarterBot", "onScan: %s(%s) - %s", ScanStatus[status], status, qrcodeImageUrl);

    qt.generate(qrcode, { small: true }); // show qrcode on console
  } else {
    log.info("StarterBot", "onScan: %s(%s)", ScanStatus[status], status);
  }
}

function onLogin(user: Contact) {
  log.info("StarterBot", "%s login", user);
}

function onLogout(user: Contact) {
  log.info("StarterBot", "%s logout", user);
}

async function onMessage(msg: Message) {
  // log.info('StarterBot', msg.toString());
  const isMsgValid = validateWechatyMsg(msg);
  if (!isMsgValid) {
    return;
  }

  const reply = await jarvis(msg.text());
  if (reply) {
    bot.say(reply);
  }
}

const bot = WechatyBuilder.build({
  name: "jarvis-bot",
  puppet
});

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);
bot.on("message", onMessage);

bot
  .start()
  .then(() => log.info("StarterBot", "Starter Bot Started."))
  .catch((e) => log.error("StarterBot", e));
