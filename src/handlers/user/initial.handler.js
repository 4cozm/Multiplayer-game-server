//가장 최초 유저 접속시 여기서 처리해줌

import { addUser } from "../../session/user.session.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";
import { createUser, findUserByDeviceId, updateUserLogin } from "../../utils/db/user/user.db.js";

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;

    addUser(socket, deviceId);

    // 유저 정보 응답 생성
    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, { userId: deviceId }, deviceId);

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;
