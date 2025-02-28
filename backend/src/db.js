import mongoose from 'mongoose';

const connectDB = async () => {
  console.log(process.env.MONGODB_URI);

  const connection = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://gauravawasthigehu:gaurav123@cluster0.la480.mongodb.net/");
  
  console.log('MongoDB Connected Successfully');
  return connection;
};

export default connectDB;
