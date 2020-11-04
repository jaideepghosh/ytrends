import mongoose from "mongoose";

export const getConnectionString = (
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DATABASE
) => {
  return `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
};

export default (connectionString) => {
  console.log("connectionString::", connectionString);
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log("Connected to mongodb.");
      return resolve(mongoose);
    } catch (error) {
      console.error("Mongoose connection error.");
      reject(new Error("Unable to connect to mongodb."));
    }
  });
};
