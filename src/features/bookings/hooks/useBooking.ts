import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../../services/apiBooking/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  //console.log("bookingId", bookingId);

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => {
      if (!bookingId) {
        throw new Error("Booking ID is required");
      }
      return getBooking(Number(bookingId));
    },
    retry: false,
  });

  return { isLoading, error, booking };
}
