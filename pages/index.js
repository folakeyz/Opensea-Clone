import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";
const Home = () => {
  const { address, connectWallet } = useWeb3();

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== "Unnamed" ? ` ${userName}` : ""}!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };

  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
      };
      const result = await client.createIfNotExists(userDoc);
      welcomeUser(result.userName);
    })();
  }, [address]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {address ? (
        <>
          <Header />
          <Hero />
        </>
      ) : (
        <>
          <Hero connect={true} onClick={() => connectWallet("injected")} />
        </>
      )}
    </div>
  );
};

export default Home;
