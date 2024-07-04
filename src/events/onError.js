import { removeUser } from "../session/user.session.js";
import CustomError from "../utils/parser/error/customError.js";
import { handlerError } from "../utils/parser/error/errorHandler.js";

export const onError = (socket) => (error) => {
  console.error("소켓에러:", error);
  handlerError(socket, new CustomError(500, "소켓오류", error.message));

  //세션에서 유저 삭제
  removeUser(socket);
};
