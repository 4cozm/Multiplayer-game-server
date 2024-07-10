//유저가 연결이 끊기면 정상 종료,비정상 종료 두가지 케이스가 있음
import { getGameSession } from '../session/game.session.js';
import { gameSessions, userSessions } from '../session/sessions.js';
import { getUserBySocket } from '../session/user.session.js';

const onDisconnect = (socket) => {
  try {
    const user = getUserBySocket(socket);
    const gameSession = getGameSession(1);
    gameSession.removeUser(user.id);
    if (gameSessions.length > 0) {
      const userIndexInGameSessions = gameSessions.findIndex((item) => item.users.id === user.id);
      if (userIndexInGameSessions !== -1) {
        gameSessions.users.splice(userIndexInGameSessions, 1);
      }
      console.log('게임 세션에서 유저 제거됨');
    }
    // userSessions에서 유저 제거
    if (userSessions.length > 0) {
      const userIndexInUserSessions = userSessions.findIndex(
        (sessionUser) => sessionUser.id === user.id,
      );
      if (userIndexInUserSessions !== -1) {
        userSessions.splice(userIndexInUserSessions, 1);
        console.log('유저 세션에서 유저 제거됨');
      }
    }
  } catch (error) {
    console.error('유저 정보 제거중 오류 발생', error);
  }
};

export default onDisconnect;
