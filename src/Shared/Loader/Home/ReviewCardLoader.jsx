import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReviewCardLoader = () => {
  return (
    <div className="row">
      {[1, 2, 3, 4].map(() => (
        <div className="col-sm-3">
          <Skeleton style={{ width: "100%", height: "250px", borderRadius: "20px" }} />
        </div>
      ))}
    </div>
  );
};

export default ReviewCardLoader;
