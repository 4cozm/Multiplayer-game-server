import { userSessions } from "./sessions.js";

export const addUser = (socket, uuid) => {
  const user = { socket, id: uuid, sequence: 0 }; //유저의 초기화 상태
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index != -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getNextSequence = (id) => {
  //시퀀스를 올려주는 함수
  const user = getUserById(id);
  if (user) {
    return ++user.sequence;
  }
  return null;
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};
