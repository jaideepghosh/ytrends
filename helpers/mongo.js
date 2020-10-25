import mongoose from "mongoose";
export default async (connectionString) => {
    return new Promise((resolve, reject) => {
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
