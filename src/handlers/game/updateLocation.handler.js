import { getGameSession } from '../../session/game.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

const updateLocationHandler = ({ socket, userId, payload }) => {
  try {
    const {x, y } = payload;
    const gameSession = getGameSession(1);

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    const user = gameSession.getUser(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'updateLocation 유저를 찾을 수 없습니다.');
    }
    user.updatePosition(x, y);
    const packet = gameSession.getAllLocation(userId);
    console.log(`유저 ${user.id} ,${x,y}`)
    socket.write(packet);
  } catch (error) {
    handleError(socket, error);
  }
};

export default updateLocationHandler;
