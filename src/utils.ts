import fs from "fs";
import path from "path";

function asyncWrap(func: Function, scope?: Object) {
  return function (...args: any[]) {
    if (args.length) {
      const temp = args.pop();
      if (typeof temp !== "function") {
        // @ts-ignore
        args.push(temp);
      }
    }

    return new Promise(function (resolve, reject) {
      // @ts-ignore
      args.push(function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });

      func.apply(scope || null, args);
    });
  };
}

const accessSync = asyncWrap(fs.access);
const statSync = asyncWrap(fs.stat);
const renameSync = asyncWrap(fs.rename);
const mkdirSync = asyncWrap(fs.mkdir);
const readFileSync = asyncWrap(fs.readFile);
const writeFileSync = asyncWrap(fs.writeFile);

export function transformPath(filePath: string, sep = "/") {
  return filePath.replace(/[\\/]/g, sep);
}

export async function checkFileExists(filePath: string) {
  try {
    await accessSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * 递归创建目录
 */
export async function recursiveMkdir(dirPath: string) {
  const prevDirPath = path.dirname(dirPath);
  try {
    await accessSync(prevDirPath);
  } catch (err) {
    await recursiveMkdir(prevDirPath);
  }

  try {
    await accessSync(dirPath);

    const stat = await statSync(dirPath);
    // @ts-ignore
    if (stat && !stat.isDirectory()) {
      await renameSync(dirPath, `${dirPath}.bak`);
      await mkdirSync(dirPath);
    }
  } catch (err) {
    await mkdirSync(dirPath);
  }
}

export function readJson(filePath: string) {
  try {
    const content = require(filePath);
    delete require.cache[require.resolve(filePath)];
    return content;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function readFile(filePath: string) {
  try {
    return await readFileSync(filePath, "utf8");
  } catch (err) {
    return console.error(err);
  }
}

export async function writeFile(filePath: string, data: string | NodeJS.ArrayBufferView) {
  try {
    await recursiveMkdir(path.dirname(filePath));
    return await writeFileSync(filePath, data, "utf8");
  } catch (err) {
    return console.error(err);
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function sleepRandom(start: number, end: number) {
  return new Promise((resolve, reject) => {
    const delta = end - start;

    if (delta < 0) {
      reject(new Error("end must be grater than start"));
    }

    const random = Math.floor(Math.random() * delta + start);
    console.log("Sleep: ", random);
    setTimeout(resolve, random);
  });
}
