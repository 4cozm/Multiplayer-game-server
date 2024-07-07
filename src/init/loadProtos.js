import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import protobuf from "protobufjs";
import { packetNames } from "../protobuf/packetNames.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoDir = path.join(__dirname, "../protobuf");

const getAllProtoFiles = (dir, fileList = []) => {
  //배열을 반환할거임
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

const protoMessages = {
  //서버 메모리에 올라가있는 프로토 버프 메세지를 저장?
};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root(); //이 인스턴스가 프로토버프 파일을 가져올거임
    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packageName, types] of Object.entries(packetNames)) {
      protoMessages[packageName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packageName][type] = root.lookupType(typeName);
      }
    } //entries를 가지고 key:value를 다 가지고옴

    console.log("protobuf 파일이 로드되었습니다");
  } catch (error) {
    console.error("protobuf파일 로드중 오류가 발생했습니다", error);
  }
};


<<<<<<< HEAD
=======
export const getProtoMessages =()=>{
  return {...protoMessages}//얕은 복사로 원본을 참조만 함
}
>>>>>>> parent of 72e8abb (update: 에러 핸들러)
