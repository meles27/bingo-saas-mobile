export interface CardTemplateListEntity {
  id: string;
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
