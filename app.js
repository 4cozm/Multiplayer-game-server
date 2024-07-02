//echo 서버 만들기 -> 게임 서버로 변환

import net from "net";
import dotenv from "dotenv";
import { readHeader, writeHeader } from "./utils.js";
import { TOTAL_LENGTH_SIZE, HANDLER_ID, MAX_MESSAGE_LENGTH } from "./constants.js";
import {handlers} from "./handlers/index.js";
dotenv.config();

const port = process.env.PORT || 3000;
const host = "localhost";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const buffer = Buffer.from(data);

    const { length, handlerId } = readHeader(data);
    console.log("핸들러 ID =", handlerId);
    console.log("길이정보 :", length);

    if (length > MAX_MESSAGE_LENGTH) {
      console.error("ERROR:메세지 길이가 너무 깁니다", length);
      socket.write(`Error:메세지가 너무 깁니다`);
    }

    if (!handlers[handlerId]) {
      console.error("ERROR:존재하지 않는 핸들러ID", handlerId);
      socket.write(`Error:존재하지 않는 핸들러ID`);
    }

    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID; //6
    const message = buffer.slice(headerSize);

    console.log(`클라이언트에게서 받은 메세지:${message}`);

    const responseMessage = "3명인데 왜 스쿼드임";
    const responseBuffer = Buffer.from(responseMessage);

    const header = writeHeader(responseBuffer.length, handlerId);

    const packet = Buffer.concat([header, responseBuffer]);

    socket.write(packet);
  });
});

server.listen(port, host, () => {
  console.log("서버가 정상 실행 되었습니다. 포트:", port);
});
