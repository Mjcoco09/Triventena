import { useModal } from '../../context/Modal';
import "./openModal.css"
function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className, // optional: custom class name for the button
  style // optional: custom inline styles for the button
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <button className={`openModalButton ${className}`} style={style} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
