import { GameStatus, GameSyncStateEntity } from "@/types/api/game/game.type";
import { create } from "zustand";

interface GameStoreState {
  activeGame: Partial<GameSyncStateEntity["activeGame"]>;
  nextScheduledGame: Partial<GameSyncStateEntity["nextScheduledGame"]> | null;
  daubedNumbers: Set<number>;
  myCardsId: string[];
}

interface GameStoreActions {
  setGameState: (data: GameSyncStateEntity) => void;
  toggleDaubedNumber: (num: number) => void; // More descriptive name
  reset: () => void;
}

const initialState: GameStoreState = {
  activeGame: {
    id: "",
    serial: 0,
    description: "",
    status: "un set" as GameStatus,
    prize: "",
    entryFee: "",
    startedAt: "",
    startedWaitingAt: null,
    endedAt: null,
    currency: "",
    lastNumberCalled: 0,
    calledNumbers: [],
    patterns: [],
  },
  nextScheduledGame: null,
  daubedNumbers: new Set(),
  myCardsId: [],
};

export const useGameStore = create<GameStoreState & GameStoreActions>(
  (set, get) => ({
    ...initialState,

    setGameState: (data) =>
      set((state) => {
        return {
          activeGame: data.activeGame,
          nextScheduledGame: data.nextScheduledGame,
          daubedNumbers:
            state.activeGame?.id === data.activeGame?.id
              ? state.daubedNumbers
              : new Set(),
        };
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
