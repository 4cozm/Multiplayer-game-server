import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import protobuf from "protobufjs";
import { packetNames } from "../protobuf/packetNames.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, "../protobuf");

const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === ".proto") {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

let protoMessages = {};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();
    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packageName, types] of Object.entries(packetNames)) {
      protoMessages[packageName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        const messageType = root.lookupType(typeName);
        if (!messageType) {
          console.error(`타입 ${typeName}을(를) 찾을 수 없습니다.`);
          continue;
        }
        protoMessages[packageName][type] = messageType;
      }
    }

    console.log("protobuf 파일이 로드되었습니다");
  } catch (error) {
    console.error("protobuf 파일 로드 중 오류가 발생했습니다", error);
  }
};

export const getProtoMessages = () => {
  return { ...protoMessages };
};
