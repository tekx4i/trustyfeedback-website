import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchCard = () => {
  return (
    <div className="mb-0">
      {[1, 2, 3, 4, 5].map(() => (
        <div className="d-flex mb-2 gap-2">
          <div className="align-self-center">
            <Skeleton style={{ width: "40px", height: "40px", borderRadius: "100px" }} />
          </div>
          <div className="text-start align-self-center">
            <Skeleton style={{ width: "200px", height: "10px", borderRadius: "100px" }} />
            <Skeleton style={{ width: "140px", height: "10px", borderRadius: "100px" }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchCard;
