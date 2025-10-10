import type { BaseQueryParams } from ".";

export type UserStatus = "active" | "suspended";

export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string | null;
  status: UserStatus;
  imageId: string | null;
  lastLogin: string;
  dateJoined: string;
  deletedAt: null | string;
  phone: string;
}

export interface UserProfileEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string | null;
  status: UserStatus;
  image_public_id: string | null;
  lastLogin: string;
  dateJoined: string;
  deletedAt: null | string;
  phone: string;
}

export type UserQueryParamsIface = BaseQueryParams & {
  includeDeleted?: boolean;
  status?: UserStatus;
};
