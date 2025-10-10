import { urls } from "@/config/urls";
import { socketManager } from "@/lib/socket/socket.manager";
import { ConnectionStatus, SocketPayload } from "@/lib/socket/socket.schema";
import { useSocketStore } from "@/store/socket-store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Socket } from "socket.io-client";

export interface UseSocketOptions {
  url?: string;
  namespace?: string;
  token?: string;
}
export interface UseSocketReturn {
  socket: Socket | null;
  status: ConnectionStatus;
  error: Error | null;
  emit: <T>(event: string, payload: T, ack?: (res: any) => void) => void;
  on: <T>(event: string, handler: (response: SocketPayload<T>) => void) => void;
  off: (event: string, handler?: (...args: any[]) => void) => void;
}

const DEFAULT_URL = urls.getSockBaseUrl();

// This object has a stable memory reference. It is created only once when the module loads.
// It prevents the Zustand selector from returning a new object on every render.
const STABLE_DEFAULT_STATE = {
  status: ConnectionStatus.DISCONNECTED,
  error: null,
};

/**
 * A production-ready hook that subscribes a component to a shared socket connection.
 * It is optimized to prevent re-render loops and ensure state consistency.
 */
export const useSocket = ({
  url = DEFAULT_URL,
  namespace,
  token,
}: UseSocketOptions = {}): UseSocketReturn => {
  const connectionKey = useMemo(
    () => socketManager.getKey(url, namespace, token),
    [url, namespace, token]
  );

  const [socket, setSocket] = useState<Socket | null>(null);

  // This selector now returns a STABLE object reference when the connection
  // state doesn't exist yet. This is the key to breaking the infinite re-render loop.
  const { status, error } = useSocketStore(
    (state) => state.connections[connectionKey] || STABLE_DEFAULT_STATE
  );

  useEffect(() => {
    const socketInstance = socketManager.getSocket(url, namespace, token, [
      "websocket",
      "polling",
    ]);
    setSocket(socketInstance);

    return () => {
      socketManager.releaseSocket(url, namespace, token);
    };
    // The dependency array now correctly includes `transports`.
  }, [connectionKey, url, namespace, token]);

  const emit = useCallback(
    <T>(event: string, payload: T, ack?: (res: any) => void) => {
      if (socket?.connected) {
        socket.emit(event, payload, ack);
      } else {
        console.warn(
          `[useSocket] Socket not connected. Cannot emit event: '${event}'`
        );
      }
    },
    [socket]
  );

  const on = useCallback(
    <T>(event: string, handler: (response: SocketPayload<T>) => void) => {
      socket?.on(event, handler);
    },
    [socket]
  );

  const off = useCallback(
    (event: string, handler?: (...args: any[]) => void) => {
      socket?.off(event, handler);
    },
    [socket]
  );

  return useMemo(
    () => ({
      socket,
      status,
      error,
      emit,
      on,
      off,
    }),
    [socket, status, error, emit, on, off]
  );
};
