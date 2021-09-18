import "../styles/DynamicButton.scss";
const DynamicButton = (props) => {
    const { title, disabled, state } = props.buttonProps;
    return(
        <button disabled={disabled}>
            {state === "loading" &&
                <span className="buttonLoading">
                    <span className="d d1">.</span>
                    <span className="d d2">.</span>
                    <span className="d d3">.</span>
                    loading
                    <span className="d d4">.</span>
                    <span className="d d5">.</span>
                    <span className="d d6">.</span>
                </span>
            }
            {state === "ready" && 
                `${title}`
            }
        </button>
    )
}

export default DynamicButton;