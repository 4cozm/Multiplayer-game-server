import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { getGameSession } from "../../session/game.session.js";

const updateLocationHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession(1);

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, "게임을 찾을 수 없습니다");
    }

    const user = gameSession.getUser(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, "유저를 찾을 수 없습니다.");
    }
    user.updatePosition(x, y);
    const packet = gameSession.getOtherUsersLocation(userId); //다른 유저의 위치 정보를 전송함

    socket.write(packet);
  } catch (error) {
    console.error("업데이트 로케이션 핸들러에서 오류 발생", error);
  }
};

export default updateLocationHandler;
