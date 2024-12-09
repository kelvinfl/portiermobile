import { delay } from "@/lib/utils";
import { type UserStatistics } from "@/types/user";

export async function fetchStatistics() {
  // simulate a network request
  await delay(1000);

  // TODO: Implement fetchStatistics
  const response: UserStatistics = {
    success: 0,
    pending: 0,
    failed: 0,
  };

  return response;
}
