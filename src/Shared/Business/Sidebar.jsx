import { useState } from "react";
import home from "../../assets/Dashboard/home-2.svg";
import homeActive from "../../assets/Dashboard/home-active.svg";
import bookMark from "../../assets/Dashboard/bookmark.svg";
import bookMarkActive from "../../assets/Dashboard/archive_1.svg";
import logo from "../../assets/Dashboard/Logo_0.svg";
import { ReactSVG } from "react-svg";

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const handleSelectedMenu = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="hidden md:flex flex-col justify-start items-center bg-blue-700 m-3 p-7 rounded-3xl w-fit h-custom-height col-span-2">
      <ReactSVG src={logo} />
      <ul className="flex flex-col gap-2 my-4">
        <li
          onClick={() => handleSelectedMenu("Dashboard")}
          className={`flex items-center gap-2 ${
            selectedMenu === "Dashboard"
              ? "text-white bg-blue-600 font-semibold"
              : "text-white/50 hover:bg-blue-600/20 duration-300"
          } p-2 px-4 rounded-full cursor-pointer`}
        >
          <ReactSVG src={selectedMenu !== "Dashboard" ? homeActive : home} />{" "}
          Dashboard
        </li>
        <li
          onClick={() => handleSelectedMenu("Bookmarks")}
          className={`flex items-center gap-2 ${
            selectedMenu === "Bookmarks"
              ? "text-white bg-blue-600 font-semibold"
              : "text-white/50 hover:bg-blue-600/20 duration-300"
          } p-2 px-4 rounded-full cursor-pointer`}
        >
          <ReactSVG
            src={selectedMenu !== "Bookmark" ? bookMarkActive : bookMark}
          />{" "}
          Bookmarks
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
