export interface UserWalletEntity {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    image: string | null;
  };
  reserved: string;
  total: string;
  available: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
