import { SocketEvent } from "@/lib/socket/socket.schema";
import { GameSyncStateEntity } from "@/types/api/game/game.type";
import { useEffect, useMemo, useState } from "react";
import { useSocket } from "../base/api/use-socket";

// Define the shape of the data the hook will provide
interface GameSubscriptionState {
  activeGames: GameSyncStateEntity["activeGames"];
  nextScheduledGame: GameSyncStateEntity["nextScheduledGame"] | null;
}

// Define the options the hook accepts
interface UseGameSubscriptionOptions {
  tenantId?: string;
  token?: string;
}

/**
 * A custom React hook to subscribe to real-time game state for a specific tenant.
 * It encapsulates all the logic for socket connection, event handling, and state management,
 * providing a clean, reactive interface for UI components.
 *
 * @param {UseGameSubscriptionOptions} options - The tenantId and auth token.
 * @returns An object containing the connection status and the latest game state.
 */
export const useGameSubscription = ({
  tenantId,
  token,
}: UseGameSubscriptionOptions) => {
  // Memoize the namespace to prevent the useSocket hook from reconnecting on every render.
  const namespace = useMemo(
    () => (tenantId ? `/tenant-${tenantId}` : undefined),
    [tenantId]
  );

  // It will only connect if a namespace is provided.
  const sock = useSocket({
    namespace,
    token,
  });

  // Local state to hold the synchronized game data.
  const [gameState, setGameState] = useState<GameSubscriptionState>({
    activeGames: [],
    nextScheduledGame: null,
  });

  // The main effect for handling socket events.
  useEffect(() => {
    // Do nothing if the socket is not available (e.g., no tenantId/token).
    if (!sock.socket) {
      return;
    }

    // Define the handler for the comprehensive game state update.
    const handleGameSync = (response: { payload: GameSyncStateEntity }) => {
      // We only care about successful data pushes from the server.
      if (response.payload) {
        setGameState({
          activeGames: response.payload.activeGames || [],
          nextScheduledGame: response.payload.nextScheduledGame || null,
        });
      }
    };

    // Subscribe to the event.
    sock.on<GameSyncStateEntity>(SocketEvent.T_GAME_SYNC, handleGameSync);

    // Cleanup: It's crucial to unsubscribe from the event when the component
    // unmounts or when the socket instance changes.
    return () => {
      sock.off(SocketEvent.T_GAME_SYNC, handleGameSync);
    };
    // This effect depends on the socket instance itself. When it changes (e.g., new tenantId),
    // the old listeners will be cleaned up, and new ones will be attached.
  }, [sock]);

  // Return a clean, easy-to-use object for the consuming component.
  return {
    status: sock.status, // Expose the raw connection status (e.g., 'connected', 'connecting')
    activeGames: gameState.activeGames,
    nextScheduledGame: gameState.nextScheduledGame,
  };
};
