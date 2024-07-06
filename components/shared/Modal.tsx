interface ModalProps {
  text: string;
  action: () => void;
}

const Modal = ({ text, action }: ModalProps) => {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">{text}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
        <button onClick={action}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
