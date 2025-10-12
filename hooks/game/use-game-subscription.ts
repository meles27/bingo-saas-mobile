import { SocketEvent, SocketPayload } from "@/lib/socket/socket.schema";
import { useGameStore } from "@/store/game-store";
import { GameSyncStateEntity } from "@/types/api/game/game.type";
import { useEffect, useMemo } from "react";
import { useSocket } from "../base/api/use-socket"; // Your existing socket hook

interface UseGameSubscriptionOptions {
  tenantId?: string;
  token?: string;
}

/**
 * A pure synchronization hook. It subscribes to a tenant’s live game updates
 * and syncs the state into the centralized useGameStore.
 * It does not return any state itself to prevent unnecessary re-renders.
 */
export const useGameSubscription = ({
  tenantId,
  token,
}: UseGameSubscriptionOptions) => {
  const namespace = useMemo(
    () => (tenantId ? `/tenant-${tenantId}` : undefined),
    [tenantId]
  );

  const sock = useSocket({
    namespace,
    token,
  });

  // Access store actions without creating a subscription.
  const { setStatus, setGameState, reset } = useGameStore.getState();

  // Effect to sync connection status to the store.
  useEffect(() => {
    setStatus(sock.status);
  }, [sock.status, setStatus]);

  // Effect to subscribe to game data and sync it to the store.
  useEffect(() => {
    // Guard against running without a valid socket.
    if (!sock.socket) return;

    // The handler that receives data and updates the store.
    const handleGameSync = (response: SocketPayload<GameSyncStateEntity>) => {
      // We only care about successful data pushes with a payload.
      if (response.status === "info" && response.payload) {
        setGameState(response.payload);
      }

      console.info("current snapshot state", response);
    };

    sock.on<GameSyncStateEntity>(SocketEvent.T_GAME_SYNC, handleGameSync);

    sock.socket?.onAny((event, response) =>
      console.log("all type of event,", event, response)
    );
    // The cleanup function is critical.
    return () => {
      sock.off(SocketEvent.T_GAME_SYNC, handleGameSync);
      reset();
    };
  }, [sock.socket, setGameState, reset]); // Depends only on the socket instance itself.
};
