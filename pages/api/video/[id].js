import TrendsModel from "../../../models/trends";

const getVideo = async (request, response) => {
  const {
    query: { id, name }
  } = request;

  try {
    const trends = await TrendsModel.findById(id).populate("channel");
    if (!trends) {
      return response.status(404).json({ message: `Invalid video url` });
    }
    return response.status(200).json({
      data: trends
    });
  } catch (error) {
    return response.status(404).json({ message: `Internal server error.` });
  }
};

export default getVideo;
