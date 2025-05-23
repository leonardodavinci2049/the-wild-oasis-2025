import styled from "styled-components";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import { Flag } from "../../components/Flag";
import Tag from "../../components/Tag";
import Button from "../../components/Button";
import { TodayActivity } from "../../types/booking/bookinsType";

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
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }: { activity: TodayActivity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag || ""} alt="Guest's country flag" />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Link to={`/checkin/${id}`} style={{ textDecoration: "none" }}>
          <Button size="small" variation="primary">
            Check in
          </Button>
        </Link>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id.toString()} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
