import mongoose, { Schema } from "mongoose";

const TrendSchema = new Schema({
  video_id: {
    type: String,
    required: true
  },
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
  thumbnails: {
    default: {
      url: String,
      width: Number,
      height: Number
    },
    medium: {
      url: String,
      width: Number,
      height: Number
    },
    high: {
      url: String,
      width: Number,
      height: Number
    },
    standard: {
      url: String,
      width: Number,
      height: Number
    },
    maxres: {
      url: String,
      width: Number,
      height: Number
    }
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "channels"
  },
  view_count: {
    type: Number,
    required: true
  },
  like_count: {
    type: Number,
    required: true
  },
  dislike_count: {
    type: Number,
    required: true
  }
});

let Trend;
try {
  // Trying to get the existing model to avoid OverwriteModelError
  Trend = mongoose.model("trends");
} catch {
  Trend = mongoose.model("trends", TrendSchema);
}

export default Trend;
