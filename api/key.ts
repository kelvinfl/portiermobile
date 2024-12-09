import { delay } from "@/lib/utils";
import { Key } from "@/types/key";
import { getRandomDateOrUndefined } from ".";

export async function fetchKeys({ limit }: { limit: number }) {
  // simulate a network request
  await delay(1000);

  // TODO: Implement fetching keys
  const response: Key[] = [
    {
      keyId: 1,
      name: "Key 1",
      division: "Engineering",
      pic: "John Doe",
      spesification: [1, 2, 3],
      location: {
        name: "Location 1",
        address: "Address 1",
        latitude: 0,
        longitude: 0,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      keyId: 2,
      name: "Key 2",
      division: "Sales",
      pic: "Jane Doe",
      spesification: [4, 5, 6],
      location: {
        name: "Location 2",
        address: "Address 2",
        latitude: 1,
        longitude: 1,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      keyId: 3,
      name: "Key 3",
      division: "Marketing",
      pic: "Jim Doe",
      spesification: [7, 8, 9],
      location: {
        name: "Location 3",
        address: "Address 3",
        latitude: 2,
        longitude: 2,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      keyId: 4,
      name: "Key 4",
      division: "HR",
      pic: "Jack Doe",
      spesification: [10, 11, 12],
      location: {
        name: "Location 4",
        address: "Address 4",
        latitude: 3,
        longitude: 3,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      keyId: 5,
      name: "Key 5",
      division: "IT",
      pic: "Jill Doe",
      spesification: [13, 14, 15],
      location: {
        name: "Location 5",
        address: "Address 5",
        latitude: 4,
        longitude: 4,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
  ];
  return response;
}

export async function searchKeys(query: string) {
  // simulate a network request
  await delay(1000);

  const response: Key[] = [
    {
      keyId: 1,
      name: "Key 1",
      division: "Engineering",
      pic: "John Doe",
      spesification: [1, 2, 3],
      location: {
        name: "Location 1",
        address: "Address 1",
        latitude: 0,
        longitude: 0,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      keyId: 2,
      name: "Key 2",
      division: "Sales",
      pic: "Jane Doe",
      spesification: [4, 5, 6],
      location: {
        name: "Location 2",
        address: "Address 2",
        latitude: 1,
        longitude: 1,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      keyId: 3,
      name: "Key 3",
      division: "Marketing",
      pic: "Jim Doe",
      spesification: [7, 8, 9],
      location: {
        name: "Location 3",
        address: "Address 3",
        latitude: 2,
        longitude: 2,
      },
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
  ];
  return response;
}

export async function getKeyById(keyId: number) {
  // simulate a network request
  await delay(1000);

  const response: Key = {
    keyId: 1,
    name: "Key 1",
    division: "Engineering",
    pic: "John Doe",
    spesification: [1, 2, 3],
    location: {
      name: "Location 1",
      address: "Address 1",
      latitude: 0,
      longitude: 0,
    },
    createdAt: getRandomDateOrUndefined(),
    updatedAt: getRandomDateOrUndefined(),
  };
  return response;
}
