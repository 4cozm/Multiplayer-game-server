//가장 최초 유저 접속시 여기서 처리해줌

import { addUser as addUserSession, getUserById } from "../../session/user.session.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";
import { getGameSession } from "../../session/game.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId } = payload;
    addUserSession(socket, deviceId, playerId);//유저 인스턴스를 유저세션에 등록
    
    const gameSessions = getGameSession(1); // 지금은 1번방 밖에 없음
    if (!gameSessions) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, "게임방에 참여하는 중 오류 발생");
    }
    const user = getUserById(deviceId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, "게임방에 참여할 유저 정보를 찾는데 실패 했습니다");
    }else if(gameSessions.getUser(user)){
      //이미 유저가 해당 게임에 존재한다면
      throw new CustomError(ErrorCodes.USER_ALREADY_JOINED,"해당 유저는 이미 게임방에 존재합니다");
    }
    
    gameSessions.addUser(user); //유저를 게임방에 참가시킴

    // 유저 정보 응답 생성
    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, { userId: deviceId }, deviceId);

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handlerError(socket, error);
  }
};

export default initialHandler;
