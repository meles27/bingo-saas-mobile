export type GameCardStatus = "active" | "disqualified";

export interface GameCardListEntity {
  id: string;
  status: GameCardStatus;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string | string;
  };
  template: {
    id: string;
    serial: number;
    layout: Array<number>;
  };
}
