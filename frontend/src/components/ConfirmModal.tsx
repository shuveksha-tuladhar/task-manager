import useGlobalStore from "../stores/useGlobalStore";

const ConfirmModal = () => {
  const { isOpen, modalData, closeModal } = useGlobalStore();

  if (!isOpen || !modalData) return null;

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{modalData.title}</h3>
        <p className="py-4">{modalData.message}</p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => {
                modalData.onConfirm();
            }}
          >
            Yes
          </button>
          <button className="btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
