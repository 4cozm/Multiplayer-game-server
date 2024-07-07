import { getProtoMessages } from "../../init/loadProtos.js";
import { getNextSequence } from "../../session/user.session.js";
import config from "../../config/config.js";
import { PACKET_TYPE } from "../../constants/header.js";
export const createResponse = (handlerId, responseCode, data = null, userId) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
    sequence: userId ? getNextSequence(userId) : 0,
  };

  const buffer = Response.encode(responsePayload).finish(); //finish써줘야함 사용방법임

  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUint32BE(buffer.length + config.packet.totalLength + config.packet.typeLength, 0);
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUint8(PACKET_TYPE.NORMAL, 0);

  return Buffer.concat([packetLength, packetType, buffer]);
};
