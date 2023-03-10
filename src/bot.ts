#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import "dotenv/config.js";

import { Contact, Message, ScanStatus, WechatyBuilder, log } from "wechaty";
import { generate } from "qrcode-terminal";
import PuppetPadlocal from "wechaty-puppet-padlocal";

import { jarvis } from "./jarvis.js";
import { readConf } from "./conf.js";

const conf = await readConf();

const puppet = new PuppetPadlocal({
  token: conf["wechatyPuppetToken"]
});

function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = ["https://wechaty.js.org/qrcode/", encodeURIComponent(qrcode)].join("");
    log.info("StarterBot", "onScan: %s(%s) - %s", ScanStatus[status], status, qrcodeImageUrl);

    generate(qrcode, { small: true }); // show qrcode on console
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

  jarvis({ msg, bot });
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
