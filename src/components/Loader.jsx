import { PropagateLoader } from "react-spinners";

const Loader = ({loading}) => {
  return (
    <PropagateLoader color={"#69d1c5"} loading={loading} size={15} />
  )
}

export default Loader;