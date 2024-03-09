import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Database connected successfuly`);
  } catch (error) {
    console.log(error);
    console.error(error.message);
    process.exit(1);
  }
};
