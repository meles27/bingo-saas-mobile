import { ConnectionStatus } from "@/lib/socket/socket.schema";
import { GameSyncStateEntity } from "@/types/api/game/game.type";
import { create } from "zustand";

/* --------------------------- TYPES --------------------------- */
interface GameStoreState {
  status: ConnectionStatus;
  gameId: string | null; // Can now be null
  activeGame: GameSyncStateEntity["activeGame"] | null;
  nextScheduledGame: GameSyncStateEntity["nextScheduledGame"] | null;
}

interface GameStoreActions {
  setStatus: (status: GameStoreState["status"]) => void;
  setGameState: (data: GameSyncStateEntity) => void; // Now expects the full, correct DTO
  reset: () => void;
}

/* --------------------------- STORE --------------------------- */
const initialState: GameStoreState = {
  status: "disconnected",
  gameId: null,
  activeGame: null,
  nextScheduledGame: null,
};

export const useGameStore = create<GameStoreState & GameStoreActions>(
  (set) => ({
    ...initialState,

    setStatus: (status) => set({ status }),

    // This action is now the single source of truth for game state changes.
    // It guarantees consistency.
    setGameState: (data) =>
      set({
        activeGame: data.activeGame,
        nextScheduledGame: data.nextScheduledGame,
        // Derive the gameId from the payload. If no active game, it becomes null.
        gameId: data.activeGame?.game.id || null,
      }),

    reset: () => set(initialState),
  })
);
