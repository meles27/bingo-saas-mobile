import { io, Socket } from "socket.io-client";

/**
 * Enum for the hook's internal connection status.
 */
export enum ConnectionStatus {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  CONNECTING = "connecting",
  ERROR = "error",
}

interface ManagedSocket {
  socket: Socket;
  refCount: number;
  status: ConnectionStatus;
  error: Error | null;
}

// The Singleton SocketManager class
class SocketManager {
  private static instance: SocketManager;
  private sockets = new Map<string, ManagedSocket>();
  private subscribers = new Map<
    string,
    Set<(status: ConnectionStatus, error: Error | null) => void>
  >();

  // Private constructor to enforce singleton pattern
  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  /**
   * Generates a unique key for a connection based on its properties.
   */
  private getKey(url: string, namespace?: string, token?: string): string {
    return `${url}-${namespace || ""}-${token || ""}`;
  }

  public getSocket(
    url: string,
    namespace?: string,
    token?: string,
    transports: ("polling" | "websocket")[] = ["websocket", "polling"]
  ): ManagedSocket {
    const key = this.getKey(url, namespace, token);
    let managedSocket = this.sockets.get(key);

    if (managedSocket) {
      managedSocket.refCount++;
    } else {
      const finalUrl = namespace
        ? `${url}/${namespace.replace(/^\//, "")}`
        : url;
      const newSocket = io(finalUrl, {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        transports,
        auth: token ? { token } : undefined,
      });

      managedSocket = {
        socket: newSocket,
        refCount: 1,
        status: ConnectionStatus.CONNECTING,
        error: null,
      };

      this.sockets.set(key, managedSocket);
      this.addDefaultListeners(key, managedSocket);
    }
    return managedSocket;
  }

  public releaseSocket(url: string, namespace?: string, token?: string): void {
    const key = this.getKey(url, namespace, token);
    const managedSocket = this.sockets.get(key);

    if (managedSocket) {
      managedSocket.refCount--;
      if (managedSocket.refCount <= 0) {
        managedSocket.socket.disconnect();
        this.sockets.delete(key);
        this.subscribers.delete(key);
      }
    }
  }

  public subscribe(
    key: string,
    callback: (status: ConnectionStatus, error: Error | null) => void
  ) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(callback);
  }

  public unsubscribe(
    key: string,
    callback: (status: ConnectionStatus, error: Error | null) => void
  ) {
    this.subscribers.get(key)?.delete(callback);
  }

  private notifySubscribers(
    key: string,
    status: ConnectionStatus,
    error: Error | null
  ) {
    this.subscribers.get(key)?.forEach((cb) => cb(status, error));
  }

  private addDefaultListeners(key: string, managedSocket: ManagedSocket) {
    const { socket } = managedSocket;

    socket.on("connect", () => {
      managedSocket.status = ConnectionStatus.CONNECTED;
      managedSocket.error = null;
      this.notifySubscribers(key, managedSocket.status, managedSocket.error);
    });

    socket.on("disconnect", () => {
      managedSocket.status = ConnectionStatus.DISCONNECTED;
      managedSocket.error = null;
      this.notifySubscribers(key, managedSocket.status, managedSocket.error);
    });

    socket.on("connect_error", (err: Error) => {
      managedSocket.status = ConnectionStatus.ERROR;
      managedSocket.error = err;
      this.notifySubscribers(key, managedSocket.status, managedSocket.error);
    });
  }
}

// Export a single instance for the entire application
export const socketManager = SocketManager.getInstance();
