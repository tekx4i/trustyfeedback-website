import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PricingLoader = () => {
  return (
    <table className="table bg-white">
      <thead>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <tr>
            {[1, 2, 3, 4, 5].map((i) => (
              <td>
                <Skeleton style={{ width: "95%", height: "50px", borderRadius: "6px" }} />
              </td>
            ))}
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default PricingLoader;
