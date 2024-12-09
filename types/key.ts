import { Location } from ".";

export type Key = {
  createdAt: string; // Diperoleh dari "created_at" di response API
  holderId: string;  // Diperoleh dari "holder_id" di response API
  holder_name: string; // Diperoleh dari "holder_name" di response API
  issue: {
    copy: number;
    description: string;
    number: string;
  }[]; // Diperoleh dari "issue" di response API
  locationLatitude: number; // Diperoleh dari "location_latitude" di response API
  locationLongitude: number; // Diperoleh dari "location_longitude" di response API
  notes: string; // Diperoleh dari "notes" di response API
  requestId: string; // Diperoleh dari "request_id" di response API
  requestUser: string; // Diperoleh dari "request_user" di response API
  sign: string; // Diperoleh dari "sign" di response API
  location?: Location; // Tetap ada jika ingin menyertakan lokasi dalam format tersendiri
  updatedAt?: string; // Tidak ada di API response, namun bisa ditambahkan sesuai kebutuhan
};
