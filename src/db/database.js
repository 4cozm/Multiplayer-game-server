import config from "../config/config.js";
import mysql from "mysql2/promise";
import { formatDate } from "../utils/dateFomatter.js";
const { databases } = config;

// 데이터베이스 커넥션 풀 생성 함수
const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: 10, // 커넥션 풀에서 최대 연결 수
    queueLimit: 0, // 0일 경우 무제한 대기열
  });
  //커스텀 쿼리 - 오버라이딩 해서 구현
  const originQuery = pool.query;
  pool.query = (sql, params) => {
    const date = new Date();
    console.log(`[${formatDate(date)}] Execution query : ${sql} ${params ? `${JSON.stringify(params, null, 2)}` : ``}`);
    return originQuery.call(pool, sql, params);
  };
  return pool;
};

//DB와 통신할때는 이 pools로 할거임
const pools = {
  GAME_DB: createPool(databases.GAME_DB),
  USER_DB: createPool(databases.USER_DB),
};

export default pools;
