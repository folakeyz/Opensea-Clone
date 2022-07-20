import { IoMdSnow } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "./styles.module.css";

const NFTImage = ({ selectedNft }) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <IoMdSnow />
          <div className={styles.likesCounter}>
            <AiOutlineHeart />
            2.3K
          </div>
        </div>
      </div>
      <div className={styles.image}>
        <img src={selectedNft?.image} alt="nft" />
      </div>
    </div>
  );
};

export default NFTImage;
