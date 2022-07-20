import React from "react";
import Header from "../../components/Header";
import ItemActivity from "../../components/NFT/ItemActivity";
import styles from "./styles.module.css";

const Stats = () => {
  return (
    <div>
      <Header />
      <div className={styles.banner}>
        <div className={styles.activity}>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
};

export default Stats;
