import { getProtoTypeNameByHandlerId } from "../../handlers/index.js";
import { getProtoMessages } from "../../init/loadProtos.js";
import CustomError from "./error/customError.js";
import { ErrorCodes } from "./error/errorCodes.js";

export const packetParser = (data) => {
  const protoMessage = getProtoMessages();
  //공통 패킷 구조를 디코딩
  const Packet = protoMessage.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data); //디코드된 구조가 나옴
  } catch (error) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, "패킷 디코딩에 실패하였습니다");
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.clientVersion;
  const sequence = packet.sequence;

  if (clientVersion !== config.clientVersion) {
    throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH, "클라이언트 버전이 다릅니다");
  }

  //기본 패킷 구조 이외의 페이로드를 파싱하는 코드가 필요함
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  //지금 이 핸들러에서 사용하는 프로토버프 타입은 무엇인지,어떤 메세지 구조를 사용하는지 가져옴

  if (!protoTypeName) {
    throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, "알 수 없는 핸들러 ID", handlerId);
  }

  const [namespace, typeName] = protoTypeName.split(".");
  //handler/index.js에서 타입을 "."기준으로 구분 namespace, typeName 을 initial "." InitialPacket 느낌

  const PayloadType = protoMessage[(namespace, typeName)];
  let payload;
  try {
    payload = PayloadType.decode(packet.payload); //공통패킷 구조에 포함되는애긴한데 여기서 처리하기로 함
  } catch (error) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, "패킷 디코딩에 실패하였습니다");
  }

  const errorMessage = PayloadType.verify(payload);
  //필드가 없어서 나는 에러 확인 하지만. 이 코드는 원래 decode메서드에 포함이 되는 기능이므로, 스킵해도 상관없지만 일단 남겨둔다고 함 (동작구조를 잘 모른다면 좋은선택)
  if (errorMessage) {
    throw new CustomError(ErrorCodes.INVALID_PACKET, "패킷 구조가 일치하지 않습니다", errorMessage);
  }

  //필드가 비어있는 경우 = 필수 필드가 누락된 경우
  const expectedFields = Object.keys(payload.fields);
  const actualFields = Object.keys(payload); //파싱 이후에 들어있는 필드
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field)); //실제로 들어온 필드가 expectedFields에 하나라도 없으면 필터로 거름
  if (missingFields.length > 0) {
    throw new CustomError(ErrorCodes.MISSING_FIELDS, "필수 필드가 누락되었습니다", missingFields.join(", "));
  }

  //시퀀스 검증 user.session파일에서 이를 init해주고 있음 그걸 이용

  return { handlerId, userId, payload, sequence };
};
