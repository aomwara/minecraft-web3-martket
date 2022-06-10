import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { data } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Jack Minecraft Shop</title>
        <meta name="description" content="Jack Minecraft Shop" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} style={{ marginBottom: "20px" }}>
          Jack Minecraft <a href="#">Shop</a>
        </h1>

        <div style={{ paddingTop: "20px" }}> {data?.address}</div>
        <hr />
        <Link href="/market">
          <Button color="gradient" auto>
            Launch App
          </Button>
        </Link>
      </main>
    </div>
  );
}
