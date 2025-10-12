export interface CardTemplateListEntity {
  id: number;
  serial: number;
  layout: Array<number>;
}

export interface CardTemplateDetailEntity {
  id: string;
  fingerprint: string;
  layout: Array<number>;
  createdAt: string;
  updatedAt: string;
}
