import mongoose, { Schema } from "mongoose";

const TrendSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  video_url: {
    type: String,
    required: true
  },
  thumbnails: [
    {
      quality: String,
      url: String,
      width: Number,
      height: Number
    }
  ],
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Trend = mongoose.model("trends", TrendSchema);
export default Trend;
