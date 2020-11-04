import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>YT Trends</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <h1>Trending Videos</h1>
      <div>Loading...</div>
    </>
  );
}
