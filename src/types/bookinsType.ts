export type BookingStatus = 'unconfirmed' | 'confirmed' | 'checked-in' | 'checked-out';

export interface BookingType {
  id?: number;
  created_at?: string;
  startDate?: string;
  endDate?: string;
  nunNights: number;
  nunGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
  cabinId: number;
  guestId: number;
}