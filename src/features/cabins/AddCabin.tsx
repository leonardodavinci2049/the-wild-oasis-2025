import Button from "../../styled_components/Button";
import Modal from "../../styled_components/Modal";

import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm cabinToEdit={null} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
