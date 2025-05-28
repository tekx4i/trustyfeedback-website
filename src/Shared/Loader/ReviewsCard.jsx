import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReviewsCard = () => {
  return (
    <div className="row mb-0">
      {[1, 2, 3, 4].map(() => (
        <div className="col-sm-3">
          <Skeleton style={{ width: "100%", height: "350px", borderRadius: "20px", marginBottom: "20px" }} />
        </div>
      ))}
    </div>
  );
};

export default ReviewsCard;
