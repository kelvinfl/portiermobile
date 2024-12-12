import { Key } from '@/types/key';

export async function fetchKeys({ limit }: { limit: number }) {
  const response: Key[] = [];
  return response;
}

export async function searchKeys(query: string) {
  const response: Key[] = [];
  return response;
}

export async function getKeyById(keyId: number) {
  const response: Key = {} as Key;
  return response;
}
