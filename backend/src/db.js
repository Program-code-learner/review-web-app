import mongoose from 'mongoose';

const connectDB = async () => {
  console.log(process.env.MONGODB_URI);

  const connection = await mongoose.connect(process.env.MONGODB_URI);
  
  console.log('MongoDB Connected Successfully');
  return connection;
};

export default connectDB;
