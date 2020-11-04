import axios from "axios";
import { COMMON } from "../constants";

export const getTrendingVideos = (
  key,
  region = COMMON.DEFAULT_GEOLOCATION_CODE,
  max_result = COMMON.MAX_RESULT
) => {
  const TRENDING_VIDEO_API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=${region}&maxResults=${max_result}&key=${key}`;
  return new Promise(async (resolve, reject) => {
    try {
      const trendingVideos = await axios.get(TRENDING_VIDEO_API_URL);
      return resolve(trendingVideos.data);
    } catch (error) {
      console.log("getTrendingVideos:: error::", error);
      return reject(new Error("Internal Server Error."));
    }
  });
};

export const getChannelData = (channel_id, key) => {
  const CHANNEL_STAT_API_URL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channel_id}&key=${key}`;
  return new Promise(async (resolve, reject) => {
    try {
      const channelData = await axios.get(CHANNEL_STAT_API_URL);
      return resolve(channelData.data);
    } catch (error) {
      console.log("getChannelData:: error::", error);
      return reject(new Error("Internal Server Error."));
    }
  });
};
