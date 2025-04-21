import supabase from "../supabase";

export type BookingStatus =
  | "unconfirmed"
  | "confirmed"
  | "checked-in"
  | "checked-out";

export interface BookingType {
  id: number;
  created_at?: string;
  startDate?: string;
  endDate?: string;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  status?: BookingStatus;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string | null;
}

export async function updateBooking(
  bookingId: number,
  BookingUpd: Partial<BookingType>
) {
  const { data, error } = await supabase
    .from("bookings")
    .update(BookingUpd)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}
