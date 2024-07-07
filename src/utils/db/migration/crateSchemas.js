import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pools from "../../../db/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeSqlFile = async (pool, filePath) => {
  const sql = fs.readFileSync(filePath, "utf8");
  const queries = sql
    .split(";")
    .map((query) => query.trim())
    .filter((query) => query.length > 0); 
    //세미콜론 기준으로 나누는 이유는 "user_db.sql" 에 들어가보면 두가지의 raw쿼리가 ; 을 기준으로 구분되어 있음
    for(const query of queries){
        await pool.query(query);
    }
};

const crateSchemas = async () => {
    const sqlDir = path.join(__dirname,"../sql");
    try{
        await executeSqlFile(pools.USER_DB,path.join(sqlDir,'user_db.sql'))
    }catch(error){
        console.error("데이터베이스 테이블 생성중 오류 발생",error);
    }

};


crateSchemas().then(()=>{
    console.log("마이그레이션 완료됨");
    process.exit(0);
}).catch((error)=>{
    console.error(error);
    process.exit(1);
})