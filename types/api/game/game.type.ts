export type GameStatus =
  | "scheduled"
  | "waiting"
  | "in_progress"
  | "paused"
  | "completed"
  | "cancelled";

export const gameStatusMap: Record<
  GameStatus,
  { label: string; color: string }
> = {
  scheduled: { label: "Scheduled", color: "#3B82F6" }, // Blue
  waiting: { label: "Waiting", color: "#8B5CF6" }, // Purple
  in_progress: { label: "In Progress", color: "#10B981" }, // Green
  completed: { label: "Completed", color: "#8B5CF6" }, // Purple
  cancelled: { label: "Cancelled", color: "#EF4444" }, // Red
  paused: { label: "Paused", color: "#F59E0B" }, // Amber
};

export interface GameListEntity {
  id: string;
  name: string;
  description: string | null;
  status: GameStatus;
  totalRounds: number;
  entryFee: string;
  startedAt: string;
  endedAt: string;
  currency: string;
}

export interface GameDetailEntity {
  id: string;
  serial: number;
  description: string;
  status: GameStatus;
  prize: string;
  entryFee: string;
  startedAt: string;
  startedWaitingAt: string | null;
  endedAt: string | null;
  currency: string;
  patterns: {
    id: string;
    name: string;
    description: string;
    coordinates: [number, number][];
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface CreateGameApiInput {
  name: string;
  description?: string;
  entryFee: string;
  startedAt: string; // ISO String
  currency: string;
}

export class UpdateGameApiInput {
  name?: string;
  description?: string;
  entryFee?: string;
  startedAt?: string;
  currency?: string;
}

export interface GameQueryParamsIface {
  offset: number;
  limit: number;
  search?: string;
  entryFee?: string;
  status?: GameStatus;
}

interface _GameSyncStateEntity {
  activeGame: {
    id: string;
    serial: number;
    description: string;
    status: GameStatus;
    prize: string;
    entryFee: string;
    startedAt: string;
    startedWaitingAt: string | null;
    endedAt: string | null;
    currency: string;
    lastNumberCalled: number;
    calledNumbers: number[];
    patterns: Array<{
      id: string;
      name: string;
      description: string;
      coordinates: Array<[number, number]>;
    }>;
  };

  nextScheduledGame: {
    id: string;
    serial: number;
    description: string;
    status: GameStatus;
    prize: string;
    entryFee: string;
    startedAt: string;
    startedWaitingAt: string | null;
    endedAt: string | null;
    currency: string;
    lastNumberCalled: number;
    calledNumbers: number[];
    patterns: Array<{
      id: string;
      name: string;
      description: string;
      coordinates: Array<[number, number]>;
    }>;
  };
}

export type GameSyncStateEntity = Partial<_GameSyncStateEntity>;
