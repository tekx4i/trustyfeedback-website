import { useContext } from "react";
import PlaceholderImg from "../../../../Shared/PlaceholderImg/PlaceholderImg";
import Reward from "../../../../assets/Dashboard/rewards.svg";
import { ReactSVG } from "react-svg";
import { MyReviewsHelperFunction } from "../../../../helper/MyReviewsHelper";
import "./MyReviewLayout.scss";
import { getStorage } from "../../../../services/storage";
import { IMG_URL } from "../../../../constants/constants";
import { AuthContext } from "../../../../context/UserDashboardSlice";

const MyReviewLayout = ({ children, reviewsLength }) => {
  const overview = MyReviewsHelperFunction();
  const userInfo = getStorage("userInfo");
  const parsedInfo = JSON.parse(userInfo);
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard_layout_reviews">
      <div className="bg_layout">
        {overview.profile?.map((profile) => (
          <div key={profile.id} className="main_reviews_l">
            <div className="profile_review">
              {parsedInfo.image ? <img src={IMG_URL + parsedInfo.image} /> : <PlaceholderImg className={""} />}
              <div className="align-self-center">
                <h3 className="">{profile.name}</h3>
                <p className="badge_img">
                  {profile.contribution}
                  <span>{user?.badge?.icon && <img src={IMG_URL + user?.badge?.icon} />}</span>
                </p>
              </div>
            </div>
            <ul className="reviews_count d-flex align-self-center">
              {overview.reviews?.map((reviews, index) => (
                <li className="position-relative">
                  <div key={reviews.id} className="review_boxes">
                    <h3 className="mb-0">{reviews.total}</h3>
                    <p className="mb-0 ">{reviews.review}</p>
                  </div>
                  {index !== overview.reviews.length - 3 && <div className="sided_border" />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <main className="child_layout">{children}</main>
    </div>
  );
};

export default MyReviewLayout;
