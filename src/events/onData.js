//커링(Currying)이라는 ES6문법 씀 매개변수 2개받음

import config from "../config/config.js";

//스트림을 사용해서 원하는 길이만큼 청크가 도착했을때 잘라서 사용하는 방법임
export const onData = (socket) => (data) => {
    console.log("데이터 받는중:",data);
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
    } else {
      //아직 전체 패킷이 도착하지 않았음
      break;
    }
  }
};
