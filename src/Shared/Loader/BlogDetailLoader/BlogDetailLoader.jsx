import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogDetailLoader = () => {
  return (
    <div className="container">
      <Skeleton style={{ width: "100%", height: "300px", borderRadius: "20px", marginBottom: "10px" }} />
      <Skeleton style={{ width: "100%", height: "300px", borderRadius: "20px", marginBottom: "10px" }} />
      <Skeleton style={{ width: "100%", height: "300px", borderRadius: "20px", marginBottom: "10px" }} />
      <Skeleton style={{ width: "100%", height: "300px", borderRadius: "20px", marginBottom: "10px" }} />
    </div>
  );
};

export default BlogDetailLoader;
