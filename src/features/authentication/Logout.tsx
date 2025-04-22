import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../components/ButtonIcon";
import SpinnerMini from "../../components/SpinnerMini";
import { useLogout } from "./hooks/useLogout";

function Logout() {
  const { logout, isPending: isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
