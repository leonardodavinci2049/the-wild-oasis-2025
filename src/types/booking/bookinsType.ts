export type BookingStatus =
  | "unconfirmed"
  | "confirmed"
  | "checked-in"
  | "checked-out";

  
export interface BookingsType {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice?: number;
  totalPrice: number;
  status: BookingStatus;
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string | null;
  cabinId?: number;
  guestId?: number;
  cabins: { id: number; name: string };
  guests: { fullName: string; email: string }; // Certifique-se de que o tipo aqui reflete os dados reais
}

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
  cabinId?: number;
  guestId?: number;
  guests?: {
    fullName: string;
    email: string;
    country: string;
    countryFlag?: string;
    nationalID: string;
  };
  cabins?: {
    name: string;
  };
}
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

export interface GetBookingsResult {
  data: BookingType[];
  count: number;
}

export interface BookingSimple {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
  numDays: number;
}

export interface StaySimple {
  id: number;
  startDate: string;
  endDate: string;
  numNights?: number;
  status: BookingStatus;
  guests: { fullName: string };
}

export interface TodayActivity {
  id: number;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  numNights: number;
  guests: {
    fullName: string;
    nationality: string | null;
    countryFlag: string | null;
  };
}
