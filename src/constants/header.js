export const TOTAL_LENGTH = 4;
export const PACKET_TYPE_LENGTH = 1;

export const PACKET_TYPE = {
    PING:0, //추후 레이턴시 측정을 위한 핑
    NORMAL:1, // 데이터 처리가 필요한 패킷은 1
    LOCATION:3, //캐릭터 좌표 동기화에 씀
}