import ImageActions from "../components/modals/ActionModal";
import styles from "./styles/Actions.module.css";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Actions = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <BiArrowBack size={24} />
          <span>Back</span>
        </button>
        <h1 style={{ color: "black" }}>Manage Your Image</h1>
      </div>
      <div className={styles.cardsGridWrapper}>
        <ImageActions />
      </div>
    </div>
  );
};

export default Actions;
