import { BiArrowBack } from "react-icons/bi";
import CustomCard from "../components/card/Card";
import styles from "./styles/Cards.module.css";

const Cards = () => {
  const storedCards = JSON.parse(sessionStorage.getItem("cards")) || [];

  const handleDownload = (index) => {
    console.log(`Card ${index} image downloaded!`);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <BiArrowBack size={24} />
          <span>Back</span>
        </button>
        <h1 style={{ color: "black" }}>Your Cards</h1>
      </div>
      <div className={styles.cardsGridWrapper}>
        {storedCards.length > 0 ? (
          <div className={styles.cardsGrid}>
            {storedCards.map((card, index) => (
              <CustomCard
                key={index}
                image={card.image}
                description={card.description}
                ondownload={() => handleDownload(index)}
              />
            ))}
          </div>
        ) : (
          <p>No cards found. Please create some cards first.</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
