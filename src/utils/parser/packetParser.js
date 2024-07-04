import { getProtoMessages } from "../../init/loadProtos.js";

export const packetParser = (data) => {
  const protoMessage = getProtoMessages();
  //공통 패킷 구조를 디코딩
  const Packet = protoMessage.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data); //디코드된 구조가 나옴
  } catch (error) {
    console.error(e);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.clientVersion;
  const payload = packet.payload;
  const sequence = packet.sequence;

  console.log(`clientVersion:${clientVersion}`);

  return { handlerId, userId, payload, sequence };
};
