export type UserStatistics = {
  success: number;
  pending: number;
  failed: number;
};

export type AuthResponse = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};
