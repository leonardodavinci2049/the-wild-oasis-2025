import styled from "styled-components";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { Flag } from "../../components/Flag";
import DataItem from "../../components/DataItem";
import { BookingType } from "../../types/booking/bookinsType";

const StyledBookingDataBox = styled.section`
  /* Box */
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  /* padding: 2.4rem 4rem; */
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  /* font-size: 1.8rem; */
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

interface PriceProps {
  isPaid: boolean;
}

const Price = styled.div<PriceProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

interface BookingTypePronps {
  booking: BookingType;
}

function BookingDataBox({ booking }: BookingTypePronps) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests = 1,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid = false,
    guests: {
      fullName: guestName = "Unknown Guest",
      email = "N/A",
      country = "Unknown",
      countryFlag,
      nationalID = "N/A",
    } = {},
    cabins: { name: cabinName } = { name: "Unknown Cabin" },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {startDate
            ? format(new Date(startDate), "EEE, MMM dd yyyy")
            : "Unknown Date"}{" "}
          (
          {isToday(new Date(startDate ?? 0))
            ? "Today"
            : startDate
            ? formatDistanceFromNow(startDate)
            : "Unknown"}
          ) &mdash;{" "}
          {endDate
            ? format(new Date(endDate), "EEE, MMM dd yyyy")
            : "Unknown Date"}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName || "Unknown Guest"}{" "}
            {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice ?? 0)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice ?? 0)} cabin + ${formatCurrency(
                extrasPrice ?? 0
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          Booked{" "}
          {created_at
            ? format(new Date(created_at), "EEE, MMM dd yyyy, p")
            : "Unknown Date"}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
