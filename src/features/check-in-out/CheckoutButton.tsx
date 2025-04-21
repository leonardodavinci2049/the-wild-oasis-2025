import Button from "../../components/Button";
import { useCheckout } from "./hooks/useCheckout";

function CheckoutButton({ bookingId }: { bookingId: string }) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(Number(bookingId))}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
