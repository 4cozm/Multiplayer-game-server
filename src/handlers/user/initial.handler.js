//가장 최초 유저 접속시 여기서 처리해줌
import { createResponse } from "../../response/createResponse.js";
import { addUser } from "../../session/user.session.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { handlerError } from "../../utils/parser/error/errorHandler.js";

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    //핸들러에서는 기본적으로 인자를 소켓,유저아이디,페이로드가 필요하다

    const { deviceId } = payload;
    //initial.proto파일에서 InitialPacket에 deviceId가 포함되도록 했기에 payload에는 해당 값이 있어야함

    addUser(socket, deviceId);

    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, { userId: deviceId }, deviceId);
    socket.write(initialResponse); //뭔가 처리가 끝났을때 보내는 것 http res같은 느낌
  } catch (error) {
    handlerError(socket,error);
  }
};

export default initialHandler;
