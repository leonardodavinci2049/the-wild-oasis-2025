import styled from "styled-components";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */
`;

const Guest = styled.div`
  font-weight: 500;
`;

import Tag from "../../components/Tag";
import { Flag } from "../../components/Flag";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { BookingStatus } from "../bookings/BookingRow";

interface StaySimple {
  id: number;
  startDate: string;
  endDate: string;
  numNights?: number;
  status: BookingStatus;
  guests: { fullName: string; countryFlag?: string; country?: string };
}

function TodayItem({ stay }: { stay: StaySimple }) {
  const { id, status, guests, numNights } = stay;

  const statusToAction: {
    [key in BookingStatus]: {
      action: string;
      tag: string;
      button: React.ReactElement | null;
    };
  } = {
    unconfirmed: {
      action: "unconfirmed",
      tag: "grey",
      button: <CheckoutButton bookingId={id.toString()} />,
    },
    "checked-in": {
      action: "checked-in",
      tag: "grey",
      button: <CheckoutButton bookingId={id.toString()} />,
    },
    confirmed: {
      action: "confirmed",
      tag: "grey",
      button: null,
    },
    "checked-out": {
      // nova propriedade adicionada
      action: "checked-out",
      tag: "grey",
      button: null,
    },
  };

  return (
    <StyledTodayItem>
      <Tag type={statusToAction[status].tag}>
        {statusToAction[status].action}
      </Tag>
      <Flag
        src={guests.countryFlag}
        alt={`Flag of ${guests.country || "unknown"}`}
      />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {statusToAction[status].button}
    </StyledTodayItem>
  );
}

export default TodayItem;
