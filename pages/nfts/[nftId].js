import Header from "../../components/Header";
import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useRouter } from "next/router";
import NFTImage from "../../components/NFT/NFTImage";
import GeneralDetails from "../../components/NFT/GeneralDetails";
// import ItemActivity from '../../components/NFT/ItemActivity'
// import Purchase from '../../components/NFT/Purchase'
import styles from "./styles.module.css";
import ItemActivity from "../../components/NFT/ItemActivity";
import MakeOffer from "../../components/NFT/MakeOffer";

const NFT = () => {
  const { provider } = useWeb3();
  const [selectedNft, setSelectedNft] = useState();
  const [listings, setListings] = useState([]);
  const router = useRouter();

  const nftModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      //   "https://eth-rinkeby.alchemyapi.io/v2/06dT1LbCRddkDN3UnHmiDqzsSpTO_Ut3"
    );
    return sdk.getNFTModule("0x14A39e908e8b31613A47490cf378cE97bA5288B2");
  }, [provider]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return;
    (async () => {
      const nfts = await nftModule.getAll();

      const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId);

      setSelectedNft(selectedNftItem);
    })();
  }, [nftModule]);

  const marketPlaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      //   "https://eth-rinkeby.alchemyapi.io/v2/06dT1LbCRddkDN3UnHmiDqzsSpTO_Ut3"
    );

    return sdk.getMarketplaceModule(
      "0xc88FE8b7e92D0a20d444f858B233528669D6175D"
    );
  }, [provider]);

  useEffect(() => {
    if (!marketPlaceModule) return;
    (async () => {
      setListings(await marketPlaceModule.getAllListings());
    })();
  }, [marketPlaceModule]);
  return (
    <div>
      <Header />
      <div className={styles.banner}>
        <NFTImage selectedNft={selectedNft} />
        <div className={styles.details}>
          <GeneralDetails selectedNft={selectedNft} />
          <MakeOffer
            isListed={router.query.isListed}
            selectedNft={selectedNft}
            listings={listings}
            marketPlaceModule={marketPlaceModule}
          />
        </div>
        <div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
};

export default NFT;
