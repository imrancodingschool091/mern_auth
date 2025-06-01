import mongoose, { connect } from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log("failed to connect with");
    process.exit(1);
  }
};
