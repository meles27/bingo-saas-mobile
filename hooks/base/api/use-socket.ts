import { urls } from "@/config/urls";
import { ConnectionStatus, socketManager } from "@/lib/socket/socket.manager";
import type { SocketPayload } from "@/lib/socket/socket.schema";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Socket } from "socket.io-client";

export interface UseSocketOptions {
  /** The base URL of the Socket.io server. Defaults to a configured URL. */
  url?: string;
  /** The namespace to connect to. */
  namespace?: string;
  /** The authentication token. */
  token?: string;
  /** If false, the socket will not connect automatically. Defaults to true. */
  autoConnect?: boolean;
  /** The transport protocols to use. Defaults to ["websocket", "polling"]. */
  transports?: ("polling" | "websocket")[];
}

export interface UseSocketReturn {
  /** The raw socket.io-client instance. Be cautious with direct usage. */
  socket: Socket | null;
  /** The current connection status. */
  status: ConnectionStatus;
  /** The last connection error, if any. */
  error: Error | null;
  /** Manually connect the socket if `autoConnect` is false. */
  // connect: () => void;
  /** Manually disconnect the socket. */
  // disconnect: () => void;
  /**
   * Emits an event to the server with a typed payload.
   * @example emit<MyPayloadType>('my-event', { data: 'hello' });
   */
  emit: <T>(event: string, payload: T, ack?: (res: any) => void) => void;
  /**
   * Registers a typed event handler.
   * @example on<MyPayloadType>('server-event', (response) => console.log(response.payload));
   */
  on: <T>(event: string, handler: (response: SocketPayload<T>) => void) => void;
  /**
   * Unregisters an event handler. For performance, pass the exact handler function reference.
   */
  off: (event: string, handler?: (...args: any[]) => void) => void;
}

const DEFAULT_URL = urls.getSockBaseUrl();

/**
 * A production-ready hook that subscribes a component to a shared, singleton socket connection.
 * It uses a SocketManager to prevent multiple connections to the same namespace.
 */
export const useSocket = ({
  url = DEFAULT_URL,
  namespace,
  token,
  transports = ["websocket", "polling"],
}: UseSocketOptions = {}): UseSocketReturn => {
  // We derive a stable key to identify the connection
  const connectionKey = useMemo(
    () => `${url}-${namespace || ""}-${token || ""}`,
    [url, namespace, token]
  );

  console.log("useSocket", connectionKey);

  // This state is now a reflection of the manager's state for this connection
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 1. Get the shared socket from the manager
    const managedSocket = socketManager.getSocket(
      url,
      namespace,
      token,
      (transports = ["websocket", "polling"])
    );
    setSocket(managedSocket.socket);
    setStatus(managedSocket.status);
    setError(managedSocket.error);

    // 2. Subscribe to status updates from the manager
    const updateHandler = (
      newStatus: ConnectionStatus,
      newError: Error | null
    ) => {
      setStatus(newStatus);
      setError(newError);
    };

    socketManager.subscribe(connectionKey, updateHandler);

    // 3. On unmount, release the socket reference
    return () => {
      socketManager.unsubscribe(connectionKey, updateHandler);
      socketManager.releaseSocket(url, namespace, token);
    };
  }, [connectionKey, url, namespace, token]); // Re-run if connection details change

  const emit = useCallback(
    <T>(event: string, payload: T, ack?: (res: any) => void) => {
      if (socket?.connected) {
        socket.emit(event, payload, ack);
      } else {
        console.warn(
          `[useSocket] Socket not connected for key '${connectionKey}'. Cannot emit event: '${event}'`
        );
      }
    },
    [socket, connectionKey]
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

  // The rest of the hook (connect, disconnect, return object) is no longer needed
  // as the manager handles the lifecycle. We simplify the return value.
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
