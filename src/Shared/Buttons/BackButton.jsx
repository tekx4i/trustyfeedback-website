import ArrowBack from "../../assets/Dashboard/arrow-back.svg";
import { ReactSVG } from "react-svg";

const BackButton = ({ onClick }) => {
  const styles = {
    button: {
      backgroundColor: "#DAE2ED",
      border: "none",
      color: "var(--body)",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      fontFamily: "var(--poppins)",
      display: "flex",
      gap: "10px",
      padding: "10px 20px",
      borderRadius: "100px",
    },
  };
  return (
    <button onClick={onClick} style={styles.button}>
      {" "}
      <ReactSVG src={ArrowBack} /> Back{" "}
    </button>
  );
};

export default BackButton;
