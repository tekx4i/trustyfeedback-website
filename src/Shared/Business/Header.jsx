import React from "react";
import Bell from "../../assets/Dashboard/notification.svg";
import Arrow from "../../assets/Dashboard/paginated-arrow-right.svg";
import { ReactSVG } from "react-svg";
import PlaceholderImg from "../PlaceholderImg/PlaceholderImg";

const Header = () => {
  return (
    <div className="mt-4 col-span-10">
      <div className="flex justify-between items-center">
        <h3>Welcome Back, Cloudly &#128075;</h3>
        <div className="flex justify-center items-center gap-2">
          <ReactSVG
            src={Bell}
            className="bg-blue-300 p-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-start items-center border border-body/50 p-1.5 gap-2 rounded-full">
            <PlaceholderImg className={"size-12 rounded-full"} />
            <div className="me-2">
              <h4 className="flex justify-start items-center text-body text-base leading-tight m-0 gap-2">
                Cloudly <ReactSVG src={Arrow} className="rotate-90" />
              </h4>
              <p className="text-gray-200/75 text-sm leading-tight m-0">
                www.cloudly.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
