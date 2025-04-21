import { useEffect, useState } from "react";

import { useBooking } from "../bookings/hooks/useBooking";
import { useCheckin } from "./hooks/useCheckin";
import { useSettings } from "../settings/hooks/useSettings";

import Row from "../../components/Row";
import Heading from "../../components/Heading";
import ButtonText from "../../components/ButtonText";
import BookingDataBox from "../bookings/BookingDataBox";
import Checkbox from "../../components/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import ButtonGroup from "../../components/ButtonGroup";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import styled from "styled-components";

const Box = styled.div`
  /* Add your box styles here or import the mixin if defined elsewhere */
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  // Can't use as initial state, because booking will still be loading
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const optionalBreakfastPrice =
    (numNights ?? 0) * settings.breakfastPrice * (numGuests ?? 0);

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId: bookingId ?? 0, // Provide a default value or handle undefined
        BookingUpd: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: (totalPrice ?? 0) + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId: bookingId ?? 0, BookingUpd: {} });
    }
  }
  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}

      {/* LATER */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          // If the guest has already paid online, we can't even undo this
          disabled={isCheckingIn || confirmPaid}
          id="confirm"
        >
          I confirm that {guests?.fullName || "the guest"} has paid the total
          amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice ?? 0)
            : `${formatCurrency(
                (totalPrice ?? 0) + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice ?? 0)} + ${formatCurrency(
                optionalBreakfastPrice
              )} for breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          size="medium"
          variation="primary"
          onClick={handleCheckin}
          disabled={isCheckingIn || !confirmPaid}
        >
          Check in booking #{bookingId}
        </Button>
        <Button size="medium" variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
