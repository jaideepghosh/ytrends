import mongoose, { Schema } from "mongoose";

const ChannelSchema = new Schema({
  channel_id: {
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
  view_count: {
    type: Number,
    required: false
  },
  subscriber_count: {
    type: Number,
    required: true
  }
});

const Channel = mongoose.model("channels", ChannelSchema);
export default Channel;
