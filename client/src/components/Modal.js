import "../styles/Modal.scss";
const Modal = (props) => {
  return(
    <div className="modalContainer">
      <div>
        <div className="modalHeader">
          <p>{props?.title ? props.title : ""}</p>
          <button>x</button>
        </div>
        {props?.Component && <props.Component />}
      </div>
    </div>
  )
}

export default Modal;