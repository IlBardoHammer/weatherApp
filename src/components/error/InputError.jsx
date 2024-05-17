import "../../scss/InputError.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const InputError = ({ message }) => {
  return (<span className="input-error"><FontAwesomeIcon className="input-error__icon" icon={ faXmark } size="lg"/>{ message }</span> )
}

export default InputError;