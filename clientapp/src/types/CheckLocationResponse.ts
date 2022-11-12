export interface CheckLocationResponse {
  isDeliverable: boolean;
  address: string;
  abandonedLocations: string[];
}
