import { SocketEvent, SocketPayload } from "@/lib/socket/socket.schema";
import { useAuthStore } from "@/store/auth-store";
import { useGameStore } from "@/store/game-store";
import { useTenantStore } from "@/store/tenant-store";
import { GameSyncStateEntity } from "@/types/api/game/game.type";
import { useEffect } from "react";
import { useSocket } from "../base/api/use-socket"; // Your NEW, advanced socket hook

/**
 * A pure synchronization hook that subscribes to live game updates via the
 * globally managed socket connection and syncs the state into useGameStore.
 * It pulls the necessary tenantId and token from global stores to initialize
 * the correct socket connection via `useSocket`.
 */
export const useGameSubscription = () => {
  // 1. Get connection details from global stores.
  const token = useAuthStore((state) => state.token?.access);
  const tenantId = useTenantStore((state) => state.tenantId);

  // 2. Call your advanced useSocket hook to get the connection for the current tenant.
  const { on, off } = useSocket({
    // The namespace is dynamically created based on the tenant.
    namespace: tenantId ? `/tenant-${tenantId}` : undefined,
    token,
  });

  // 3. Get the state setter actions from the game store.
  const { setGameState, reset } = useGameStore.getState();

  // 5. Effect to manage the specific "T_GAME_SYNC" event subscription.
  useEffect(() => {
    // The handler function that receives game data and updates the store.
    const handleGameSync = (response: SocketPayload<GameSyncStateEntity>) => {
      if (response.status === "success" && response.payload) {
        console.log("[GameSync] Received new game state:", response.payload);
        setGameState(response.payload);
      }
    };

    // Use the `on` method from the useSocket hook to subscribe.
    // The generic type <GameSyncStateEntity> ensures `response` is correctly typed.
    on<GameSyncStateEntity>(SocketEvent.T_GAME_SYNC, handleGameSync);

    // The cleanup function is critical.
    return () => {
      // Use the `off` method from the useSocket hook to unsubscribe.
      off(SocketEvent.T_GAME_SYNC, handleGameSync);
    };
  }, [on, off, setGameState]); // Re-subscribe if `on`/`off` methods change.

  // 6. (Optional) Add a final cleanup effect to reset the store on unmount.
  useEffect(() => {
    return () => {
      console.log("[GameSync] Unmounting, resetting game state.");
      reset();
    };
  }, [reset]);
};
