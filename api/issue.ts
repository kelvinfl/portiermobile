import { Issue } from '@/types/issue';
import { Asset } from 'expo-asset';
import { getRandomDateOrUndefined } from '.';

export async function fetchIssues({ limit }: { limit: number }) {
  const response: Issue[] = [
    {
      issueId: 1,
      name: 'Issue 1',
      description: 'Description 1',
      roomKey: '123',
      status: 'success',
      type: 'send',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      issueId: 2,
      name: 'Issue 2',
      description: 'Description 2',
      roomKey: '456',
      status: 'pending',
      type: 'receive',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      issueId: 3,
      name: 'Issue 3',
      description: 'Description 3',
      roomKey: '789',
      status: 'failed',
      type: 'send',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      issueId: 4,
      name: 'Issue 4',
      description: 'Description 4',
      roomKey: '101',
      status: 'success',
      type: 'receive',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      issueId: 5,
      name: 'Issue 5',
      description: 'Description 5',
      roomKey: '112',
      status: 'pending',
      type: 'send',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
  ];
  return response;
}

export async function searchIssues(query: string) {
  const response: Issue[] = [
    {
      issueId: 1,
      name: 'Issue 1',
      description: 'Description 1',
      roomKey: '123',
      status: 'success',
      type: 'send',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      issueId: 2,
      name: 'Issue 2',
      description: 'Description 2',
      roomKey: '456',
      status: 'pending',
      type: 'receive',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
    {
      issueId: 3,
      name: 'Issue 3',
      description: 'Description 3',
      roomKey: '789',
      status: 'failed',
      type: 'send',
      createdAt: getRandomDateOrUndefined(),
      updatedAt: getRandomDateOrUndefined(),
    },
  ];
  return response;
}

export async function getIssueById(issueId: number) {
  const response: Issue = {
    issueId: 1,
    name: 'Issue 1',
    description: 'Description 1',
    roomKey: '123',
    status: 'success',
    type: 'send',
    location: {
      name: 'Room 5, Media Department',
      address: 'Bougenville Street No.19A, South America',
      longitude: -7.424167,
      latitude: 112.426694,
    },
    signatureImage: Asset.fromModule(require('@/assets/images/example/signature.png')).uri,
    createdAt: getRandomDateOrUndefined(),
    updatedAt: getRandomDateOrUndefined(),
  };
  return response;
}
