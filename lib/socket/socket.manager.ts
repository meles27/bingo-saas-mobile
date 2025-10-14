import { io, Socket } from "socket.io-client";

interface ManagedSocket {
  socket: Socket;
  refCount: number;
}

class SocketManager {
  private static instance: SocketManager;
  private sockets = new Map<string, ManagedSocket>();

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public getKey(url: string, namespace?: string, token?: string): string {
    return [url, namespace || "default", token || "anonymous"].join("|");
  }

  public getSocket(
    url: string,
    namespace?: string,
    token?: string,
    transports: ("polling" | "websocket")[] = ["websocket", "polling"]
  ): Socket {
    const key = this.getKey(url, namespace, token);
    let managedSocket = this.sockets.get(key);

    if (managedSocket) {
      managedSocket.refCount++;
      return managedSocket.socket;
    }

    const finalUrl = namespace ? `${url}/${namespace.replace(/^\//, "")}` : url;
    const newSocket = io(finalUrl, {
      // reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      transports,
      auth: token ? { token } : undefined,
    });

    managedSocket = { socket: newSocket, refCount: 1 };
    this.sockets.set(key, managedSocket);

    this.addDefaultListeners(key, newSocket);

    return newSocket;
  }

  public releaseSocket(url: string, namespace?: string, token?: string): void {
    const key = this.getKey(url, namespace, token);
    const managedSocket = this.sockets.get(key);

    if (managedSocket) {
      managedSocket.refCount--;
      if (managedSocket.refCount <= 0) {
        managedSocket.socket.disconnect();
        this.sockets.delete(key);
      }
    }
  }

  private addDefaultListeners(key: string, socket: Socket) {
    socket.on("connect", () => {
      console.log("connect", key);
    });

    socket.on("disconnect", () => {
      console.log("disconnect", key);
    });

    socket.on("connect_error", (err: Error) => {
      console.log("connect_error", err);
    });
  }
}

export const socketManager = SocketManager.getInstance();
