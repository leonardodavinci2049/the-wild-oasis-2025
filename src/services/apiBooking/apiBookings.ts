import {
  BookingType,
  BookingSimple,
  StaySimple,
  TodayActivity,
} from "../../types/booking/bookinsType";
import { getToday } from "../../utils/helpers";
import supabase from "../supabase";

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as BookingType;
}

export async function getBookingsAfterDate(
  date: string
): Promise<BookingSimple[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, numDays, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date: string): Promise<StaySimple[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity(): Promise<TodayActivity[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}



export async function deleteBooking(id: number): Promise<{ id: number }> {
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select("id")
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return { id: data.id };
}
