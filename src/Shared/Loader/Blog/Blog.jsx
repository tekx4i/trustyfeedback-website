import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogLoader = () => {
  return (
    <div className="row mx-3">
      <div className="col-lg-6">
        <Skeleton style={{ width: "100%", height: "300px", borderRadius: "20px", marginBottom: "10px" }} />
      </div>

      <div className="col-lg-6">
        {[1, 2, 3].map(() => (
          <Skeleton style={{ width: "100%", height: "150px", borderRadius: "20px", marginBottom: "10px" }} />
        ))}
      </div>
    </div>
  );
};

export default BlogLoader;
