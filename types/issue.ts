import { Location, Status } from '.';

export type IssueType = 'send' | 'receive';

export type Issue = {
  issueId: number;
  name: string;
  description: string;
  roomKey: string;
  status: Status;
  type: IssueType;
  location?: Location;
  signatureImage?: string;
  createdAt?: string;
  updatedAt?: string;
};
