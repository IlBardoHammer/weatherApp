import "../../scss/NetworkError.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const NetworkError = ({ message }) => {
  return (
    <div className="api-error">
      <h3 className="api-error__title"><FontAwesomeIcon className="input-error__icon" icon={ faXmark } size="1x"/>ERROR</h3>
      <p className="api-error__p">{message}</p>
    </div>
  )
}

export default NetworkError;