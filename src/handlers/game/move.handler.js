
import { PACKET_TYPE } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProtos.js";
import buffer from "../../utils/parser/bufferParser.js";

const positionUpdate = (users) => {
  const protoMessages = getProtoMessages();
  const location = protoMessages.location.LocationUpdate;

  const payload = { users };
  const message = location.create(payload);
  const locationPacket = location.encode(message).finish(); //finish써줘야함 사용방법임
  return buffer(locationPacket, PACKET_TYPE.LOCATION);
};

export default positionUpdate;