export interface CreatePaymentResponse {
  clientSecret: string;
  stripePaymentIntentId: string;
  userId: string;
  vehicleId: number;
}