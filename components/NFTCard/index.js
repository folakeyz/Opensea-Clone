import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { BiHeart } from "react-icons/bi";
import Router from "next/router";
import eth from "../../public/eth.png";
import Image from "next/image";

const NFTCard = ({ nftItem, title, listings }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const listing = listings.find((listing) => listing.asset.id === nftItem.id);
    if (Boolean(listing)) {
      setIsListed(true);
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
    }
  }, [listings, nftItem]);
  return (
    <div
      className={styles.card}
      onClick={() => {
        Router.push({
          pathname: `/nfts/${nftItem.id}`,
          query: { isListed: isListed },
        });
      }}
    >
      <div className={styles.imgContainer}>
        <img src={nftItem.image} alt="nfts" />
      </div>
      <div className={styles.details}>
        <div className={styles.left}>
          <div className={styles.name}>
            <h5>{title}</h5>
          </div>
          <div className={styles.name}>
            <p>{nftItem.name}</p>
          </div>
        </div>
        {isListed && (
          <div className={styles.right}>
            <h6>Price</h6>
            <div className={styles.itemWidget}>
              <Image src={eth} alt="eth" width="10" height="8" />
              <h3>{price}</h3>
            </div>
          </div>
        )}
      </div>
      <div className={styles.likes}>
        <span className={styles.likeIcon}>
          <BiHeart />
        </span>{" "}
        {nftItem.likes}
      </div>
    </div>
  );
};

export default NFTCard;
