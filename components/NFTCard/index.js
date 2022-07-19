import React from "react";

const NFTCard = ({ nftItem }) => {
  return (
    <div>
      <img src={nftItem.image} alt="nfts" />
    </div>
  );
};

export default NFTCard;
