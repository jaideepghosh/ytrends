import mongoose from "mongoose";
export default async (connectionString) => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("Connected to mongodb.");
  } catch (error) {
    console.error("Mongoose connection error.");
    throw new Error("Unable to connect to mongodb.");
  }
};
