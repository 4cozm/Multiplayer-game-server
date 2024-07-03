import net from "net";
import initServer from "./init/index.js";
import config from "./config/config.js";
import { onConnection } from "./events/onConnection.js";


const server = net.createServer(onConnection);

initServer().then(() => {
  server.listen(config.server.port,config.server.host ,() => {
    console.log("서버 열림. 포트:", config.server.port);
    console.log(server.address());
  });
});
//initServer는 assets의 JSON데이터를 받아온다.비동기로 실행되기에 then메서드로 DB가 정상적으로 로드되면 서버를 실행시킴
