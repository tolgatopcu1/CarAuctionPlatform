export interface CreatePaymentHistoryDTO {
  clientSecret?: string | null;
  stripePaymentIntentId?: string | null;
  userId?: string | null;
  vehicleId: number;
}