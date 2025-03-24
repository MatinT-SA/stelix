import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((show) => !show)}>Add Cabin</Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
