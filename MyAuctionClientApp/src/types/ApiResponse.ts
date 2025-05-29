export interface ApiResponse<T> {
  isSuccess: boolean;
  statusCode: number;
  result?: T; // <-- Artık zorunlu değil
  errorMessages?: string[];
}
  