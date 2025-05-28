import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LookingForLoader = () => {
  return (
    <div className="d-flex mx-3">
      {[1, 2, 3, 4].map(() => (
        <div className="col-sm-2">
          <Skeleton style={{ width: "90%", height: "150px", borderRadius: "20px" }} />
        </div>
      ))}
    </div>
  );
};

export default LookingForLoader;
