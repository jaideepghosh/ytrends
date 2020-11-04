import ReactPlayer from "react-player";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const VideoScreen = ({ video }) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <ReactPlayer url={video.video_url} />
        </Grid>

        <Grid item xs={12} md={6} xl={6} lg={6}>
          <Typography gutterBottom variant="h5" component="h2">
            {video.title}
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            style={{ paddingBottom: "10px" }}
            justify="space-between"
          >
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {video.view_count} views
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                justify="center"
                align="center"
                alignitems="center"
              >
                <ThumbUpIcon align="center" />
                <Typography> {video.like_count}</Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                justify="center"
                align="center"
                alignitems="center"
              >
                <ThumbDownIcon align="center" />
                <Typography> {video.dislike_count}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} x={12} md={6} xl={6} lg={6}>
          <Divider />
          <Typography variant="subtitle1" color="textSecondary">
            {video.channel.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {video.channel.subscriber_count} subscribers
          </Typography>
          <p>{video.description}</p>
        </Grid>
      </Grid>

      <Link href="/">
        <Button variant="contained" color="secondary" target="_blank" fullWidth>
          <ArrowBackIcon />
          Go back to view Trending Video List
        </Button>
      </Link>
    </>
  );
};
export default VideoScreen;
