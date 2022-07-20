import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const Header = () => {
  const [search, setSearch] = useState("");
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src={logo} height={40} width={40} />
          <div className={styles.logoText}>NFT Project</div>
        </div>
      </Link>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search items, collections, and accounts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AiOutlineSearch />
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <Link href="/collections/0x14A39e908e8b31613A47490cf378cE97bA5288B2">
              Collections
            </Link>
          </li>
          <li>
            <Link href="/stats">Stats</Link>
          </li>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
          <li>
            <Link href="/profile">
              <div>{/* <CgProfile /> */}</div>
            </Link>
          </li>
          <li>
            <Link href="/wallet">
              <div>{/* <MdOutlineAccountBalanceWallet /> */}</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
