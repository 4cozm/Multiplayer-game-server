export class User {
  constructor(id, socket, playerId) {
    this.id = id;
    this.socket = socket;
    this.playerId = playerId;
    this.x = 0;
    this.y = 0;
    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }
}
