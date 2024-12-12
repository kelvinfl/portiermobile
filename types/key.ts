import { Location } from '.';

export type Key = {
  createdAt: string;
  holderId: string;
  holder_name: string;
  issue: {
    copy: number;
    description: string;
    number: string;
  }[];
  locationLatitude: number;
  locationLongitude: number;
  notes: string;
  requestId: string;
  requestUser: string;
  sign: string;
  location?: Location;
  updatedAt?: string;
};
