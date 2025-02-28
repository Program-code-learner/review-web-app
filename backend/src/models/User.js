import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},{timestamps: true});

const reviewSchema = new mongoose.Schema({
  movieId:{
    type: Number,
    required: true,
  },
  rating:{
    type: Number,
    required: true,
    min:1,
    max:5,
  },
  review:{
    type: String,
    required: true
  },
  createdAt:{
    type:Date,
    default: Date.now,
  }
},{timestamps: true})

const User = mongoose.model("User", userSchema);
const Review = mongoose.model("Review", reviewSchema);

export { User, Review };