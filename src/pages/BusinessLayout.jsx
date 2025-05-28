import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

function AppLayout() {
  return (
    <>
      <Header business={true} />
      <Outlet />
      <Footer business={true} />
    </>
  );
}

export default AppLayout;
