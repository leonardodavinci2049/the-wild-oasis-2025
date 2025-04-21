import { PAGE_SIZE } from "../../utils/constants";
import supabase from "../supabase";
import { z } from "zod";

export interface BookingFilter {
  field: string;
  value: string | number | boolean;
  method?: "eq" | "gte" | "lte" | "neq" | "like";
}

export interface BookingSort {
  field: string;
  direction: "asc" | "desc";
}

export interface GetBookingsParams {
  filter?: BookingFilter;
  sortBy?: BookingSort;
  page?: number;
}

export type BookingStatus =
  | "unconfirmed"
  | "confirmed"
  | "checked-in"
  | "checked-out";



export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  status: BookingStatus;
  totalPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
  cabinId: number;
  guestId: number;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
  };
}

export async function getBookings({ filter, sortBy, page }: GetBookingsParams): Promise<{ data: Booking[]; count: number }> {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, hasBreakfast, isPaid, observations, cabinId, guestId, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // FILTER
  if (filter) {
    switch (filter.method) {
      case "gte":
        query = query.gte(filter.field, filter.value);
        break;
      case "lte":
        query = query.lte(filter.field, filter.value);
        break;
      case "neq":
        query = query.neq(filter.field, filter.value);
        break;
      case "like":
        query = query.like(filter.field, String(filter.value));
        break;
      default:
        query = query.eq(filter.field, filter.value);
    }
  }

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  // Validação com zod
  const bookings = BookingSchema.array().safeParse(data);

  if (!bookings.success) {
    console.error(bookings.error);
    throw new Error("Invalid data format returned from bookings query");
  }

  return { data: bookings.data, count: count as number };
}

const BookingSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numNights: z.number(),
  numGuests: z.number(),
  status: z.enum(["unconfirmed", "confirmed", "checked-in", "checked-out"]), // Corrigido
  totalPrice: z.number(),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  observations: z.string().nullable(),
  cabinId: z.number(),
  guestId: z.number(),
  cabins: z.object({
    name: z.string(),
  }),
  guests: z.object({
    fullName: z.string(),
    email: z.string(),
  }),
});
