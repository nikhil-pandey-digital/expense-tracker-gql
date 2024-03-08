import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGOURI);
    const connection = await mongoose.connect(process.env.MONGOURI);

    console.log(`Database connected successfuly`);

  } catch (error) {
    console.log(error);
    console.error(error.message);
    process.exit(1);
  }
};
