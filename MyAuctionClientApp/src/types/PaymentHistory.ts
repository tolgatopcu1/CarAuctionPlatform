export interface PaymentHistory {
  id: number;
  userId: string;
  vehicleId: number;
  isActive: boolean;
  paymentDate: string;
}