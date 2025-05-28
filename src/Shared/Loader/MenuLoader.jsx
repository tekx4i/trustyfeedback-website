import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./MenuLoader.css";

const MenuLoader = () => {
  return (
    <div className="menu-loader-container ">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="menu-item-loader">
          <Skeleton className="menu-avatar-loader" />
          <Skeleton className="menu-text-loader" />
        </div>
      ))}
    </div>
  );
};

export default MenuLoader;
