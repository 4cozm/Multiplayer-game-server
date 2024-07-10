# Multiplayer-game-server


![image](https://github.com/4cozm/Multiplayer-game-server/assets/49065386/24efd2a9-94ed-446e-9a40-d3b380361e81)

# 접속 주소 43.203.249.219:5555

TCP로 실시간 게임 서버를 구동하는 프로젝트 입니다

### 디렉터리 구조
```
C:.
|   .env
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   .node_modules
+---assets
|       item.json
|       item_unlock.json
|       stage.json
|
+---src
|   |   server.js
|   |
|   +---classes
|   |       game.class.js
|   |       user.class.js
|   |
|   +---config
|   |       config.js
|   |
|   +---constants
|   |       env.js
|   |       handlerIds.js
|   |       header.js
|   |
|   +---events
|   |       onConnection.js
|   |       onData.js
|   |       onEnd.js
|   |       onError.js
|   |
|   +---handlers
|   |   |   index.js
|   |   |
|   |   +---game
|   |   |       location.handler.js
|   |   |       move.handler.js
|   |   |
|   |   \---user
|   |           initial.handler.js
|   |
|   +---init
|   |       assets.js
|   |       index.js
|   |       loadProtos.js
|   |
|   +---protobuf
|   |   |   inital.proto
|   |   |   packetNames.js
|   |   |
|   |   +---request
|   |   |       common.proto
|   |   |       game.proto
|   |   |
|   |   \---response
|   |           location.proto
|   |           response.proto
|   |
|   +---session
|   |       game.session.js
|   |       sessions.js
|   |       user.session.js
|   |
|   \---utils
|       +---error
|       |       customError.js
|       |       errorCodes.js
|       |       errorHandler.js
|       |
|       +---parser
|       |       bufferParser.js
|       |       packetParser.js
|       |
|       \---response
|               createResponse.js
|
\---test_client
        client.js
```

### 바이트 배열 구조


| 필드 명      | 타입     | 설명                | 크기      |
|--------------|----------|---------------------|----------|
| totalLength  | int      | 메세지의 전체 길이  | 4 Byte   |
| packetType   | int      | 패킷의 타입         | 1 Byte   |
| protobuf     | protobuf | 프로토콜 버퍼 구조체 | 가변     |
