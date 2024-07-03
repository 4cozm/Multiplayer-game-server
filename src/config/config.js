//환경변수와 관련된 모든 함수는 여기서 정의함
//이것만 호출하면 만사OK
import { CLIENT_VERSION, HOST, PORT } from "../constants/env.js";
import { TOTAL_LENGTH,PACKET_TYPE_LENGTH } from "../constants/header.js";
export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  client: {
    version: CLIENT_VERSION,
  },
  packet: {
    totalLength: TOTAL_LENGTH,
    typeLength: PACKET_TYPE_LENGTH,
  },
};

export default config;
