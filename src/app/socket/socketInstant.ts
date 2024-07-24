import { io } from "socket.io-client";

const WS = "http://localhost:9000";
const socket = io(WS);
export default socket;
