<<<<<<< HEAD
import { removeUser } from "../session/user.session.js";
import CustomError from "../utils/error/customError.js";
import { handlerError } from "../utils/error/errorHandler.js";

export const onError = (socket) => (error) => {
  console.error("소켓에러:", error);
  handlerError(socket, new CustomError(500, "소켓오류", error.message));

  //세션에서 유저 삭제
  removeUser(socket);
=======
export const onError = (socket) =>(error)=> {
    console.error("소켓에러:", error);
>>>>>>> parent of 72e8abb (update: 에러 핸들러)
};
