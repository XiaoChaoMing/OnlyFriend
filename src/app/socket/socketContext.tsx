"use client";
import { SessionContext } from "next-auth/react";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { RootState } from "../store/store";
import { callTo } from "../store/slice";

export type SocketContextType = Socket | null;

export const SocketContext = createContext<SocketContextType>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const call = useSelector((state: RootState) => state.videoCall.callTo);
  const [socket, setSocket] = useState<SocketContextType>(null);
  const session = useContext(SessionContext);
  useEffect(() => {
    const socketInstance: Socket = io("http://localhost:9000");
    socketInstance.on("connect", () => {
      socketInstance.emit("register", session?.data?.data.user.id);
      socketInstance.on("isCalling", async (data: { fromUserId: any }) => {
        dispatch(callTo(true));
        console.log(`calling from ${data.fromUserId}`);
      });
      socketInstance.on("rejectCall", async (data: { fromUserId: any }) => {
        dispatch(callTo(false));
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
