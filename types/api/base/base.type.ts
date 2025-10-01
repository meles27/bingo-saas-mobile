export interface BaseQueryParamsIface {
  search?: string;
  offset?: number;
  limit?: number;
}

export type Currency = "ETB" | "USD";

export type BaseQueryParams = {
  search?: string;
  offset?: number;
  limit?: number;
};

export interface PaginatedResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
