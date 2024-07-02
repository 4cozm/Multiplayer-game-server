//왜 여따넣음

import { HANDLER_ID, TOTAL_LENGTH_SIZE } from "./constants.js";

//on.write()랑 비슷한 역할을 함
export const readHeader = (buffer) => {
  const length = buffer.readUInt32BE(0);
  //버퍼를 0에서 부터 32비트 만큼 읽는다

  const handlerId = buffer.readUInt16BE(4);
  //4바이트는 전체 길이를 저장하는 곳이니 4
  //하지만 constance.js의 상수값인 TOTAL_LENGTH_SIZE를 대입해도 무방함

  return {
    length,
    handlerId,
  };
};

export const writeHeader = (length, handlerId) => {
  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
  const buffer = Buffer.alloc(headerSize);
  //ㄴ 써서 보내줄때는 새로운 버퍼 객체로 보내야함 6바이트 사이즈인 버퍼객체
  buffer.writeUInt32BE(length+headerSize,0);
  //ㄴ 전체 길이정보를 반환할때 length는 몰라도 headerSize는 6으로 고정이니 6더해줌
  buffer.writeUInt16BE(handlerId,4);
  return buffer;
};
