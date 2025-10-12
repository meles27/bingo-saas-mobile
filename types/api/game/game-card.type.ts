export interface GameCardListEntity {
  id: string;
  fingerprint: string;
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
