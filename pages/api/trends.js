import _ from "lodash";
import { getTrendingVideos, getChannelData } from "../../helpers/youtube";
import mongo, { getConnectionString } from "../../helpers/mongo";
import ChannelModel from "../../models/channels";
import TrendsModel from "../../models/trends";
/**
 * @description To get trending youtube videos saved in DB.
 */
const GET = async (request, response) => {
  const trends = await TrendsModel.find().populate("channel");
  const trendCount = await TrendsModel.countDocuments();
  response.statusCode = 200;
  response.json({
    meta: {
      total: trendCount
    },
    data: trends
  });
  return response;
};

/**
 * @description To get crawl youtube videos and save in DB.
 */
const CRAWL = async (request, response) => {
  const trendingVideos = await getTrendingVideos(process.env.GOOGLE_API_KEY);
  const uniqueChannelIds = _.uniq(
    _.map(trendingVideos.items, (item) => item.snippet.channelId)
  );
  let channelpayload = await Promise.all(
    uniqueChannelIds.map(async (uniqueChannelId) => {
      try {
        const channelData = await getChannelData(
          uniqueChannelId,
          process.env.GOOGLE_API_KEY
        );
        const targetChannelItem = channelData.items[0];
        return {
          channel_id: targetChannelItem.id,
          title: targetChannelItem.snippet.title,
          description: targetChannelItem.snippet.description,
          view_count: targetChannelItem.statistics.viewCount,
          subscriber_count: targetChannelItem.statistics.subscriberCount
        };
      } catch (error) {
        console.log("uniqueChannelIds:: error::", error);
      }
    })
  );
  const upsertedChannel = await Promise.all(
    channelpayload.map(async (channel) => {
      const doc = await ChannelModel.findOneAndUpdate(
        { channel_id: channel.channel_id },
        { $set: channel },
        { upsert: true, new: true }
      );
      return doc;
    })
  );
  const trendsPayload = trendingVideos.items.map((trendingVideo) => {
    return {
      video_id: trendingVideo.id,
      title: trendingVideo.snippet.title,
      description: trendingVideo.snippet.description,
      video_url: `https://www.youtube.com/watch?v=${trendingVideo.id}`,
      thumbnails: trendingVideo.snippet.thumbnails,
      channel: _.find(upsertedChannel, [
        "channel_id",
        trendingVideo.snippet.channelId
      ])._id,
      view_count: trendingVideo.statistics.viewCount,
      like_count: trendingVideo.statistics.likeCount,
      dislike_count: trendingVideo.statistics.dislikeCount
    };
  });
  const upsertedTrends = await Promise.all(
    trendsPayload.map(async (trend) => {
      const doc = await TrendsModel.findOneAndUpdate(
        { video_id: trend.video_id },
        { $set: trend },
        { upsert: true, new: true }
      );
      return doc;
    })
  );
  response.statusCode = 200;
  response.json({ message: "Successfully fetched trending videos." });
  return response;
};
export default async (req, res) => {
  if (
    !process.env.MONGO_USERNAME ||
    !process.env.MONGO_PASSWORD ||
    !process.env.MONGO_HOSTNAME ||
    !process.env.MONGO_DATABASE ||
    !process.env.GOOGLE_API_KEY
  ) {
    response.statusCode = 500;
    response.json({
      message: "Something went wrong.",
      error: "Environment not configured correctly."
    });
    return response;
  }
  const mongoose = await mongo(
    getConnectionString(
      process.env.MONGO_USERNAME,
      process.env.MONGO_PASSWORD,
      process.env.MONGO_HOSTNAME,
      process.env.MONGO_DATABASE
    )
  );
  switch (req.method) {
    case "POST":
      return CRAWL(req, res);
    default:
      return GET(req, res);
  }
};
