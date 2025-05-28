import Arrow from "../../assets/Dashboard/arrow.svg";
import { ReactSVG } from "react-svg";

const ReadReviewButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center text-blue-600 font-semibold font-Poppins gap-2 w-fit cursor-pointer"
    >
      <button>Read Review</button>
      <ReactSVG src={Arrow} />
    </div>
  );
};

export default ReadReviewButton;
