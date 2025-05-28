import PlaceholderImg from "../../../Shared/PlaceholderImg/PlaceholderImg";
import Reward from "../../../assets/Dashboard/rewards.svg";
import Stars from "../../../assets/Dashboard/Stars.svg";
import { ReactSVG } from "react-svg";
import { LikeButton, ShareButton } from "../../../Shared/Buttons/ActionButton";

const MyReviewsById = () => {
  return (
    <div className="bg-white border border-light-blue me-4 p-4 rounded-3xl">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <PlaceholderImg className={"size-16 rounded-full"} />
          <div>
            <h3 className="text-body text-xl leading-tight m-0 mt-2">
              Hayley M
            </h3>
            <p className="flex justify-center items-center gap-1 text-gray-200/75">
              Top Contributor{" "}
              <span>
                <ReactSVG src={Reward} className="w-4" />
              </span>
            </p>
          </div>
        </div>
        <ReactSVG src={Stars} />
      </div>
      <>
        <h3 className="text-body text-xl font-semibold my-3">
          Excellent & Amazing Service
        </h3>
        <p className="text-gray-200/75">
          I never receive the orders from remix. First two times I ordered only
          the cleanup bag. I only found out that they were returned after I
          installed the Fan Courier app for an unrelated order and saw the
          history. Third time I double/triple checked that the delivery address
          and phone number are correct. Once again, in the Fan Courier app I
          could see the package on its way. Fan Courier is taking forever to
          respond, Remix same. The order was paid in advance, hope I'll someday
          see either my money back or my order but until then I am highly
          disappointed by the services. Hoping that they will respond to my
          email after this review because it seems they are more active here
          than on customer support.
        </p>
        <hr className="" />
        <div className="flex justify-start items-center gap-4 mt-3">
          <LikeButton content={'Useful'} />
          <ShareButton content={'Share'} />
        </div>
      </>
      <div className="bg-blue-50 border-l-4 border-blue-600 ps-4 pe-4 pt-4 pb-1 mt-6 rounded-3xl">
        <h3 className="text-body text-xl font-bold">
          Reply From Remixshop.com
        </h3>
        <p className="text-body">
          Thank you for your review. We’ll continue working on improving our
          products and services and we apologize for any inconvenience caused.
        </p>
      </div>
    </div>
  );
};

export default MyReviewsById;
