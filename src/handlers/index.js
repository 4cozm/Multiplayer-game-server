//핸들러 매핑하기 위한 파일
import { HANDLER_IDS } from "../constants/handlerIds.js";
import initialHandler from "./user/initial.handler.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import updateLocationHandler from "./game/location.handler.js";

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    //0
    handler: initialHandler, //핸들러 키로 실제 initialHandler 함수를 가져오기
    protoType: "initial.InitialPacket", //각각의 핸들러마다 payload가 다르게 구성되어 있기에 프로토버프의 타입이름을 지정해줌
  },
  [HANDLER_IDS.LOCATION_UPDATE]: {
    handler: updateLocationHandler,
    protoType: "game.updateLocation",
  },
  //원래는 여기다가 0:핸들러 이름 이런식으로 코딩했으나
  //이제는 핸들러 ID만 따로 상수화 해서 관리함 ->constants폴더에서 처리
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, `핸들러를 찾을 수 없습니다: ID ${handlerId}`);
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId].handler) {
    console.error("프로토타입을 찾을 수 없습니다! ID:", handlerId);
  }
  return handlers[handlerId].protoType;
};
//핸들러 ID가지고 프로토 타입 이름을 조회하는
