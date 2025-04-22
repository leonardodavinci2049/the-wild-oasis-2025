import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useBooking } from "./hooks/useBooking";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { useCheckout } from "../check-in-out/hooks/useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";
import Row from "../../components/Row";
import Tag from "../../components/Tag";
import Heading from "../../components/Heading";
import ButtonText from "../../components/ButtonText";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";

import { HiArrowUpOnSquare } from "react-icons/hi2";
import ConfirmDelete from "../../components/ConfirmDelete";
import Spinner from "../../components/Spinner";
import Empty from "../../components/Empty";
import Modal from "../../components/Modal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
 const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    confirmed: "yellow",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // Garante que status está definido antes de renderizar o restante
  if (!status) return <Empty resourceName="booking status" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            <HiArrowUpOnSquare /> Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              onCloseModal={() => {}}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
export default BookingDetail;
