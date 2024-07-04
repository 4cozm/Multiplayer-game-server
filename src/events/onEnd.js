import { removeUser } from "../session/user.session.js";

export const onEnd = (socket) => () => {
  console.log("클라이언트 연결 끊김");

  //세션에서 유저 삭제
  removeUser(socket);
};
