import "../styles/Modal.scss";
const Modal = (props) => {
  return(
    <div className="modalContainer" onClick={(e)=>{
      props.setModal({modal:false, component: null, title: null})
    }}>
      <div onClick={(e)=>{e.stopPropagation()}}>
        <div className="modalHeader">
          <p>{props?.title ? props.title : ""}</p>
          <button onClick={()=>props.setModal({modal:false, component: null, title: null})}>x</button>
        </div>
        {props?.Component && <props.Component />}
        {props?.children && props.children}
      </div>
    </div>
  )
}

export default Modal;