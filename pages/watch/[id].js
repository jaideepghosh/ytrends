import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import VideoScreen from "../../components/VideoScreen";
import axios from "axios";

export default function watch() {
  const [video, setVideo] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (router && router.query && router.query.id) {
      const response = await axios.get("/api/video/" + router.query.id);
      if (response && response.data && response.data.data) {
        setVideo(response.data.data);
      }
    }
  }, [router]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {video && <VideoScreen video={video} />}
    </Container>
  );
}
