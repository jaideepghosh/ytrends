import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import VideoList from "../components/VideoList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import PanToolIcon from "@material-ui/icons/PanTool";

const Home = () => {
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState([]);
  const getTrends = async (reset = false) => {
    try {
      const skip = reset ? 0 : items.length;
      const response = await axios.get("/api/trends?skip=" + skip);
      if (reset) setItems(response.data.data);
      else setItems(items.concat(response.data.data));
    } catch (error) {
      console.log("error::", error);
    }
  };
  useEffect(async () => {
    getTrends();
  }, []);

  const fetchLatest = async () => {
    try {
      setFetching(true);
      const response = await axios.post("/api/trends");
      getTrends(true);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      console.log("error::", error);
    }
  };

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

      <Container component="main" maxWidth="md">
        <CssBaseline />

        <Typography align="center" variant="h3" component="h2">
          Trending Videos {fetching}
        </Typography>

        {!items.length && (
          <Typography align="center" component="h3">
            Loading..
          </Typography>
        )}
        {items.length && <VideoList items={items} />}

        {items.length && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              getTrends();
            }}
          >
            Load More
          </Button>
        )}
        <br />
        <br />
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            fetchLatest();
          }}
          color={fetching ? "secondary" : "default"}
          startIcon={fetching ? <PanToolIcon /> : <GetAppIcon />}
        >
          {fetching ? "Fetching, Please wait." : "Fetch Latest Trending Videos"}
        </Button>
      </Container>
    </>
  );
};

export default Home;
