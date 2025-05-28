import { v4 as uuidv4 } from "uuid";
import Phone from "../assets/Dashboard/phone.svg";
import SMS from "../assets/Dashboard/sms.svg";
import Location from "../assets/Dashboard/location.svg";

const AboutCompanyHelperFunction = () => {
  return {
    about_cloudly: [
      {
        id: uuidv4(),
        label: "About Cloudly",
        details:
          "We're on a mission at Cloudly to do good for Southeast Texas by helping our members achieve their hopes and dreams.",
      },
    ],
    contact_info: [
      {
        id: uuidv4(),
        label: "Contact Info",
        details: [
          { id: uuidv4(), icon: Phone, detail: "(629) 555-0129" },
          { id: uuidv4(), icon: SMS, detail: "debbie.baker@example.com" },
          {
            id: uuidv4(),
            icon: Location,
            detail: "2972 Westheimer Rd. Santa Ana, Illinois 85486 ",
          },
        ],
      },
    ],
  };
};

export { AboutCompanyHelperFunction };
