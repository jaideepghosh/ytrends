import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  likes: {
    margin: "20px",
    padding: "20px;"
  }
}));

const VideoCard = ({ data }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} x={12} md={6} xl={6} lg={6}>
            <img
              src={data.thumbnails.medium.url}
              title={data.title}
              alt={data.title}
            />
          </Grid>
          <Grid item xs={12} x={12} md={6} xl={6} lg={6}>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {data.channel.title}
            </Typography>
            <Grid container spacing={2} direction="row">
              <Grid item>
                <div className={classes.likes}>
                  <Typography variant="subtitle2" color="textSecondary">
                    <ThumbUpIcon />
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {data.like_count}
                  </Typography>
                </div>
              </Grid>

              <Grid item>
                <div className={classes.likes}>
                  <Typography variant="subtitle2" color="textSecondary">
                    <ThumbDownIcon />
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {data.dislike_count}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              href={`/watch/${data._id}`}
              // target="_blank"
              fullWidth
              startIcon={<VisibilityIcon />}
            >
              Watch Video
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
