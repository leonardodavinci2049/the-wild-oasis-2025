import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/constants";

import { BookingSort, BookingFilter } from "../../../types/booking/bookinsType";
import { getBookings } from "../../../services/apiBooking/apiSelectBookings";
// Adjust path if necessary

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter: BookingFilter | undefined =
    !filterValue || filterValue === "all"
      ? undefined
      : { field: "status", value: filterValue, method: "eq" }; // Default method added
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, rawDirection] = sortByRaw.split("-");
  const direction =
    rawDirection === "asc" || rawDirection === "desc" ? rawDirection : "desc";
  const sortBy: BookingSort = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count = 0 } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil((count ?? 0) / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
