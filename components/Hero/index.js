import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

const Hero = ({ connect = false, onClick = null }) => {
  return (
    <div className={styles.hero}>
      {connect ? (
        <>
          <h2>
            You need Google Chrome <br />
            to be able to run this app
          </h2>
          <h3 className={styles.red}>Your Wallet is not Connected</h3>
          <h4 className={styles.red}>
            Click on the button to connect your wallet
          </h4>

          <div className="btnContainer">
            <button type="button" onClick={onClick}>
              <div className="btn red">Connect Wallet</div>
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>
            Discover, collect <br />
            and sell extraordinary
          </h3>
          <h1>NFTs</h1>
          <p>OpenSea is the world&apos;s first and largest NFT marketplace</p>
          <div className="btnContainer">
            <Link href="">
              <div className="btn white">Explore</div>
            </Link>
            <Link href="">
              <div className="btn red">Create</div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
