import onDisconnect from "./onDisconnect.js";

export const onError = (socket) => (err) => {
  console.error('소켓 오류:', err);
  onDisconnect(socket);
};
