import { v4 as uuidv4 } from "uuid";
import { getStorage } from "../services/storage";
import { AuthContext } from "../context/UserDashboardSlice";
import { useContext } from "react";

const MyReviewsHelperFunction = (reviewsLength) => {
  const userInfo = getStorage("userInfo");
  const parsedInfo = JSON.parse(userInfo);

  const { user } = useContext(AuthContext);

  return {
    profile: [
      {
        id: uuidv4(),
        avatar: "",
        name: parsedInfo.name,
        contribution: user?.badge?.name && user?.badge?.name,
      },
    ],
    reviews: [
      {
        id: uuidv4(),
        total: user?.reviews_count ? user?.reviews_count : 0,
        review: "Reviews",
      },
      {
        id: uuidv4(),
        total: 0,
        review: "Reads",
      },
      {
        id: uuidv4(),
        total: user?.total_likes ? user?.total_likes : 0,
        review: "Useful",
      },
    ],
  };
};

export { MyReviewsHelperFunction };
