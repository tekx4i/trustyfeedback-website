import { v4 as uuidv4 } from "uuid";
import { getStorage } from "../services/storage";

const ProfileOverviewHelperFunction = () => {
  const userInfo = getStorage("userInfo");
  const parsed = JSON.parse(userInfo);
  console.log(parsed);

  return [
    {
      id: uuidv4(),
      label: "General Info",
      general_info: [
        {
          id: uuidv4(),
          label: parsed?.role_id !== 3 ? "Full Name" : "Business Name",
          name: "name",
          placeholder: "Hayley John",
          value: parsed.name,
        },
        {
          id: uuidv4(),
          label: parsed?.role_id !== 3 ? "Email Address" : "Business Email",
          name: "email",
          placeholder: "hayleym.official",
          value: parsed.email,
        },
        ...(parsed?.role_id === 3
          ? [
              {
                id: uuidv4(),
                label: "Business Website",
                name: "website",
                placeholder: "https://example.com",
                value: parsed?.business?.website || "",
              },
            ]
          : []),
        // {
        //   id: uuidv4(),
        //   label: "Country",
        //   placeholder: "Country",
        //   name: "country",
        //   value: parsed.country,
        // },
        {
          id: uuidv4(),
          label: "Postal code",
          placeholder: "Postal code",
          name: "postal_code",
          value: parsed.postal_code !== "null" ? parsed.postal_code : "",
        },
        {
          id: uuidv4(),
          label: "Phone Number",
          placeholder: "+92 84974030",
          value: parsed.number !== "null" ? parsed.number : "",
          name: "number",
        },
        { id: uuidv4(), label: "Address", placeholder: "Add address", value: parsed?.role_id !== 3 ? parsed.address : parsed?.business?.address, name: "address" },
      ],
    },

    {
      id: uuidv4(),
      label: "Change Password",
      password: [
        {
          id: uuidv4(),
          label: "Enter Current Password",
          placeholder: "***********",
          value: "",
          name: "currentPassword",
        },
        {
          id: uuidv4(),
          label: "Change Password",
          placeholder: "************",
          value: "",
          name: "password",
        },
        {
          id: uuidv4(),
          label: "Enter New Password",
          placeholder: "************",
          value: "",
          name: "confirm_password",
        },
      ],
    },
  ];
};

export { ProfileOverviewHelperFunction };
