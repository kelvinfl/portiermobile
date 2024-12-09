export type Status = "pending" | "success" | "failed";
export type ToastVariant = "success" | "error" | "info" | "warning";

export type Location = {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
};
