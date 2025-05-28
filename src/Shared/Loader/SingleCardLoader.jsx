import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleCardLoader = () => {
  return <Skeleton style={{ width: "100%", height: "350px", borderRadius: "20px", marginBottom: "20px" }} />;
};

export default SingleCardLoader;
