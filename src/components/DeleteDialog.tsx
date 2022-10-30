import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type deleteDialogProps = {
  show: boolean;
  deleteID: number;
  handleClose: () => void;
  deleteCelebrity: (id: number) => void;
};

const DeleteDialog = ({
  show,
  deleteID,
  handleClose,
  deleteCelebrity,
}: deleteDialogProps) => {
  const deleteHandler = () => {
    deleteCelebrity(deleteID);
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          Are you sure you want to Delete ?
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteDialog;
