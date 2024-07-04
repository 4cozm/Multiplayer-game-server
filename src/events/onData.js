//커링(Currying)이라는 ES6문법 씀 매개변수 2개받음

import CustomError from "../utils/parser/error/customError.js";

import config from "../config/config.js";
import { PACKET_TYPE } from "../constants/header.js";
import { getHandlerById } from "../handlers/index.js";
import { getUserById } from "../session/user.session.js";
import { packetParser } from "../utils/parser/packetParser.js";
import { ErrorCodes } from "../utils/parser/error/errorCodes.js";
import { handlerError } from "../utils/parser/error/errorHandler.js";

//스트림을 사용해서 원하는 길이만큼 청크가 도착했을때 잘라서 사용하는 방법임
export const onData = (socket) => async (data) => {
  console.log("데이터 받는중:", data);
  socket.buffer = Buffer.concat([socket.buffer, data]);
  //데이터가 청크단위를 통해서 찔끔찔끔 들어오는걸 concat을 이용해서 자기자신+찔끔찔끔을 합쳐준다

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    //데이터가 일정 이상 쌓이기 전까지는 while문을 통해서 대기
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length); //다음 패킷이 혹시 들어오면 다시 소켓버퍼로 집어넣음
      console.log("길이:", length, "패킷타입:", packetType);
      console.log("패킷:", packet.toString());

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            break; //아직은 하는게 없음
          case PACKET_TYPE.NORMAL:
            const { handlerId, userId, payload, sequence } = packetParser(packet);

            const user = getUserById(userId); //호출횟수 검증
            if (user && user.sequence !== sequence) {
              throw new CustomError(ErrorCodes.INVALID_SEQUENCE, "잘못된 호출 값 입니다");
            }

            const handler = getHandlerById(handlerId);

            await handler({ socket, userId, payload }); //await거는 이유는 현재 initial 핸들러는 DB에 접근하는 행동이 없지만 추후 추가될 수 있기 때문
        }
      } catch (error) {
        handlerError(socket, error);
      }
    } else {
      //아직 전체 패킷이 도착하지 않았음
      break;
    }
  }
};
