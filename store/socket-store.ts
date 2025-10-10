import type { ConnectionStatus } from "@/lib/socket/socket.schema";
import { create } from "zustand";

interface SocketConnectionState {
  status: ConnectionStatus;
  error: Error | null;
}

interface SocketStore {
  connections: Record<string, SocketConnectionState>;
  setConnectionState: (
    key: string,
    status: ConnectionStatus,
    error?: Error | null
  ) => void;
  removeConnection: (key: string) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  connections: {},

  setConnectionState: (key, status, error = null) =>
    set((state) => ({
      connections: {
        ...state.connections,
        [key]: { status, error },
      },
    })),

  removeConnection: (key) =>
    set((state) => {
      const newConnections = { ...state.connections };
      delete newConnections[key];
      return { connections: newConnections };
    }),
}));
