import { type UserStatistics } from '@/types/user';

export async function fetchStatistics() {
  const response: UserStatistics = {
    success: 0,
    pending: 0,
    failed: 0,
  };

  return response;
}
