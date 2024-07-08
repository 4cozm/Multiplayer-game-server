import positionUpdate from "../handlers/game/move.handler.js";

const MAX_PLAYERS = 2;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = "waiting"; // 'waiting', 'inProgress'
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error("Game session is full");
    }

    this.users.push(user);
    if (this.users.length === MAX_PLAYERS) {
      setTimeout(() => {
        this.startGame();
      }, 3000);
    }
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);

    if (this.users.length < MAX_PLAYERS) {
      this.state = "waiting";
    }
  }

  startGame() {
    this.state = "inProgress";
  }

  getOtherUsersLocation(userId) {
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map(({ id, playerId, x, y }) => ({ id, playerId, x, y }));

    return positionUpdate(locationData);
  }
  catch(error) {
    console.error("다른 유저의 위치를 가져오는 중 에러 발생:", error);
    return null;
  }
}

export default Game;
