import { GameSyncStateEntity } from "@/types/api/game/game.type";
import { create } from "zustand";

interface GameStoreState {
  activeGame: GameSyncStateEntity["activeGame"] | null;
  nextScheduledGame: GameSyncStateEntity["nextScheduledGame"] | null;
  daubedNumbers: Set<number>;
  myCardsId: string[];
}

interface GameStoreActions {
  setGameState: (data: GameSyncStateEntity) => void;
  toggleDaubedNumber: (num: number) => void; // More descriptive name
  reset: () => void;
}

const initialState: GameStoreState = {
  activeGame: null,
  nextScheduledGame: null,
  daubedNumbers: new Set(),
  myCardsId: [],
};

export const useGameStore = create<GameStoreState & GameStoreActions>(
  (set, get) => ({
    ...initialState,

    setGameState: (data) =>
      set({
        activeGame: data.activeGame,
        nextScheduledGame: data.nextScheduledGame,
      }),

    // The core logic change: a number can only be daubed if it has been called by the server.
    toggleDaubedNumber: (num) => {
      const calledNumbers = get().activeGame?.calledNumbers || [];
      if (!calledNumbers.includes(num)) {
        return;
      }

      set((state) => {
        const newDaubs = new Set(state.daubedNumbers);
        if (newDaubs.has(num)) {
          newDaubs.delete(num);
        } else {
          newDaubs.add(num);
        }
        return { daubedNumbers: newDaubs };
      });
    },

    reset: () => set(initialState),
  })
);
