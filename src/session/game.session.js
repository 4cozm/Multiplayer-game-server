import { gameSessions } from "./sessions.js";
import Game from '../classes/game.class.js'

export const makeGameSession = ()=>{
    const session = new Game(1); //따로 방을 만드는 기능이 생길때는 방별로 ID를 나눠야함
    gameSessions.push(session);
    session.startGame();
    console.log("게임 생성됨",session);
}

export const getGameSession = (id) => {
    return gameSessions.find((session) => session.id === id);
  };

