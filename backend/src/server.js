import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import * as dotenv from "dotenv";
import authRoutes from "./authRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import { Review } from "./models/User.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/reviews/:movieId", async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    res.json({ reviews, averageRating: averageRating.toFixed(1) });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().exec();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
