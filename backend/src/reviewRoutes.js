import express from "express";
import { Review } from "./models/User.js";

const router = express.Router();

// POST /api/reviews - Save a new review
router.post("/", async (req, res) => {
  try {
    const { movieId, rating, review } = req.body;

    // Validate request
    if (!movieId || !rating || !review) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new review document
    const newReview = new Review({ movieId, rating, review });
    await newReview.save();

    res.status(201).json({ message: "Review submitted successfully!", newReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



export default router;
