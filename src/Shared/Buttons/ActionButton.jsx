import { ReactSVG } from "react-svg";
import Edit from "../../assets/Dashboard/edit.svg";
import Delete from "../../assets/Dashboard/delete.svg";
import Like from "../../assets/Dashboard/like.svg";
import Share from "../../assets/Dashboard/share.svg";

const EditButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center gap-1 cursor-pointer"
    >
      <ReactSVG src={Edit} />
      <button className="text-gray-200/75 leading-tight m-0">Edit</button>
    </div>
  );
};

const DeleteButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center gap-1 cursor-pointer"
    >
      <ReactSVG src={Delete} />
      <button className="text-red leading-tight m-0">Delete</button>
    </div>
  );
};

const LikeButton = ({ onClick, content }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-start items-center gap-1 text-gray-200/75 cursor-pointer"
    >
      <ReactSVG src={Like} />
      <button>{content}</button>
    </div>
  );
};

const ShareButton = ({ onClick, content }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-start items-center gap-1 text-gray-200/75 cursor-pointer"
    >
      <ReactSVG src={Share} />
      <button>{content}</button>
    </div>
  );
};

export { EditButton, DeleteButton, LikeButton, ShareButton };
