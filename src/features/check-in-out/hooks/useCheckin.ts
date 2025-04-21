import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BookingsType } from "../../../types/booking/bookinsType";
import { updateBooking } from "../../../services/apiBooking/apiUpdateBookings";

type CheckinInput = {
  bookingId: number; // ou o tipo correto do ID
  BookingUpd?: Partial<BookingsType>; // ajuste conforme necessário
};

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, BookingUpd }: CheckinInput) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...BookingUpd,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
