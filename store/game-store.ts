import { ConnectionStatus } from "@/lib/socket/socket.schema";
import { GameSyncStateEntity } from "@/types/api/game/game.type";
import { create } from "zustand";

/* --------------------------- TYPES --------------------------- */
interface GameStoreState {
  status: ConnectionStatus;
  gameId: string | null;
  activeGame: GameSyncStateEntity["activeGame"] | null;
  nextScheduledGame: GameSyncStateEntity["nextScheduledGame"] | null;
  selectedNumbers: number[]; // User manually selected numbers (client-side)
}

interface GameStoreActions {
  setStatus: (status: GameStoreState["status"]) => void;
  setGameState: (data: GameSyncStateEntity) => void;
  reset: () => void;
  toggleSelectedNumber: (num: number) => void; // Toggle user selection
  resetSelectedNumbers: () => void; // Clear all selected numbers
}

/* --------------------------- STORE --------------------------- */
const initialState: GameStoreState = {
  status: "disconnected",
  gameId: null,
  activeGame: null,
  nextScheduledGame: null,
  selectedNumbers: [],
};

export const useGameStore = create<GameStoreState & GameStoreActions>(
  (set, get) => ({
    ...initialState,

    setStatus: (status) => set({ status }),

    setGameState: (data) =>
      set({
        activeGame: data.activeGame,
        nextScheduledGame: data.nextScheduledGame,
        gameId: data.activeGame?.game.id || null,
      }),

    reset: () => set(initialState),

    // // ✅ New: Toggle a player's selected number
    // toggleSelectedNumber: (num) =>
    //   set((state) => ({
    //     selectedNumbers: state.selectedNumbers.includes(num)
    //       ? state.selectedNumbers.filter((n) => n !== num)
    //       : [...state.selectedNumbers, num],
    //   })),

    // // ✅ New: Reset all selected numbers
    // resetSelectedNumbers: () => set({ selectedNumbers: [] }),

    toggleSelectedNumber: (num) =>
      set((state) => {
        const exists = state.selectedNumbers.includes(num);
        const next = exists
          ? state.selectedNumbers.filter((n) => n !== num)
          : [...state.selectedNumbers, num];
        return { selectedNumbers: next };
      }),

    resetSelectedNumbers: () => set({ selectedNumbers: [] }),
  })
);
