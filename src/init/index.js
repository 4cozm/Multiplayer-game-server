import { loadGameAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";

const initServer = async () => {
  try {
    await loadGameAssets();
    await loadProtos();
  } catch (error) {
    console.error(error);
    process.exit(1); //이번엔 서버 초기에 DB를 불러오는데,DB문제가 생기면 즉시 종료시킴
  }
};

export default initServer;
