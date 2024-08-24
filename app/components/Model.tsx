interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Model: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`} role="dialog">
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <label
            onClick={() => setModalOpen(false)}
            className="btn mx-auto w-full"
          >
            Close!
          </label>
        </div>
      </div>
    </div>
  );
};

export default Model;
