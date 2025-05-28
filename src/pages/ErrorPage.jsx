import { useRouteError } from "react-router-dom";
import notFound from "../assets/404-error.png";

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }} // Full viewport height to center vertically
    >
      <div className="d-flex justify-content-center">
        <img src={notFound} alt="404 Not Found" style={{ width: "300px", height: "300px", objectFit: "contain" }} />
      </div>
      <h1 className="text-center">Oops!</h1>
      <p className="text-center">{error?.error?.message || "Something went wrong. Please try again later."}</p>
    </div>
  );
}

export default Error;
