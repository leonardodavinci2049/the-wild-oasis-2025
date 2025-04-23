import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";
import { useCabins } from "../cabins/hooks/useCabins";
import Spinner from "../../components/Spinner";
import Stats from "./Stats";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

/*
We need to distinguish between two types of data here:
1) BOOKINGS: the actual sales. For example, in the last 30 days, the hotel might have sold 10 bookings online, but these guests might only arrive and check in in the far future (or not, as booking also happen on-site)
2) STAYS: the actual check-in of guests arriving for their bookings. We can identify stays by their startDate, together with a status of either 'checked-in' (for current stays) or 'checked-out' (for past stays)
*/

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings || []}
        confirmedStays={(confirmedStays || []).map((stay) => ({
          ...stay,
          numNights: stay.numNights || 0,
        }))}
        numDays={numDays}
        cabinCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart
        confirmedStays={(confirmedStays || []).map((stay) => ({
          ...stay,
          numNights: stay.numNights || 0,
        }))}
      />
      <SalesChart bookings={bookings || []} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;