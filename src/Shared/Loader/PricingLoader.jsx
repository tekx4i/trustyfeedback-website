import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PricingLoader = () => {
  return <Skeleton style={{ width: "100%", height: "550px", borderRadius: "20px", marginBottom: "20px" }} />;
};

export default PricingLoader;
