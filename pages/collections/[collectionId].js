import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { client } from "../../lib/sanityClient";
import Header from "../../components/Header";
import NFTCard from "../../components/NFTCard";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
import styles from "./styles.module.css";
import eth from "../../public/eth.png";
import Image from "next/image";

const Collection = () => {
  const router = useRouter();
  const { provider } = useWeb3();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);

  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // "https://eth-rinkeby.alchemyapi.io/v2/06dT1LbCRddkDN3UnHmiDqzsSpTO_Ut3"
    );
    return sdk.getNFTModule(collectionId);
  }, [provider]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();
      setNfts(nfts);
    })();
  }, [nftModule]);

  const marketPlaceModule = useMemo(() => {
    if (!provider) return;
    // https://rinkeby.infura.io/v3/7a25677d3ef64e30ba17930c15362d67
    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // "https://eth-rinkeby.alchemyapi.io/v2/06dT1LbCRddkDN3UnHmiDqzsSpTO_Ut3"
    );

    return sdk.getMarketplaceModule(
      "0xc88FE8b7e92D0a20d444f858B233528669D6175D"
    );
  }, [provider]);

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return;
    (async () => {
      setListings(await marketPlaceModule.getAllListings());
    })();
  }, [marketPlaceModule]);

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;

    const collectionData = await sanityClient.fetch(query);

    // console.log(collectionData, "🔥");

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);

  return (
    <div>
      <Header />
      <div className={styles.banner}>
        <img
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "https://via.placeholder.com/200"
          }
          alt="banner"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.dp}>
          <img
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : "https://via.placeholder.com/200"
            }
            alt="profile image"
          />
        </div>
        <div className={styles.name}>
          <h1>{collection?.title}</h1>
          <p>Created By: {collection?.creator}</p>
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <h3>{nfts.length}</h3>
            <p>Items</p>
          </div>
          <div className={styles.item}>
            <h3>{collection?.allOwners ? collection.allOwners.length : ""}</h3>
            <p>Owners</p>
          </div>
          <div className={styles.item}>
            <div className={styles.itemWidget}>
              <Image src={eth} alt="eth" width="10" height="8" />
              <h3>{collection?.floorPrice}</h3>
            </div>
            <p>Floor price</p>
          </div>
          <div>
            <div className={styles.itemWidget}>
              <Image src={eth} alt="eth" width="10" height="8" />
              <h3>{collection?.volumeTraded}.5K</h3>
            </div>
            <p>Volume traded</p>
          </div>
        </div>
        <div className={styles.desc}>{collection?.description}</div>
        {/* Cards */}

        <div className={styles.cardFlex}>
          {nfts.map((nftItem, id) => (
            <NFTCard
              key={id}
              nftItem={nftItem}
              title={collection?.title}
              listings={listings}
            />
          ))}
        </div>
        {/* Cards */}
      </div>
    </div>
  );
};

export default Collection;
