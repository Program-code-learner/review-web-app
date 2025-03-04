import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import Nav from "./Nav";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

interface ReviewForm {
  rating: number;
  review: string;
  movieId: number;
}

interface Review {
  id: number;
  rating: number;
  review: string;
  movieId: number;
  createdAt: string;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDescription = () => {
  const { state: movie } = useLocation();
  const [selectedRating, setSelectedRating] = React.useState(0);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewForm>();

  useEffect(() => {
    fetchReviews();
  }, [movie.id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://review-web-app-backend.onrender.com/reviews/${movie.id}`
      );
      if (response.data && Array.isArray(response.data.reviews)) {
        setReviews(response.data.reviews);
        setAverageRating(parseFloat(response.data.averageRating) || 0);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ReviewForm) => {
    const reviewData = {
      rating: selectedRating,
      review: data.review,
      movieId: movie.id,
    };

    try {
      await axios.post("https://review-web-app-backend.onrender.com/api/reviews", reviewData);
      // const response = await axios.post('http://localhost:8080/api/reviews', reviewData);

      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Nav />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="w-full md:w-[30%] h-96" />
              <div className="w-full md:w-[70%] space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-8 w-64" />
              </div>
            </div>
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Nav />
      
      {/* Movie Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <img
          src={`${TMDB_IMAGE_BASE_URL}${movie?.backdrop_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container px-4 py-8 -mt-32 relative z-10">
        {/* Movie Content */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-[30%] group">
            <img
              src={`${TMDB_IMAGE_BASE_URL}${movie?.poster_path}`}
              alt={movie?.title}
              className="w-full rounded-lg shadow-2xl transform transition duration-300 group-hover:scale-105"
            />
          </div>
          
          <div className="w-full md:w-[70%] space-y-6">
            <h1 className="text-5xl font-bold">{movie?.title}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-2xl">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                <span>{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400">
                {new Date(movie?.release_date).toLocaleDateString()}
              </span>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              {movie?.overview}
            </p>

            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <span className="block text-sm text-gray-400">Language</span>
                  <span>English</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Rating</span>
                  <span>{movie?.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">User Reviews</h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < review.rating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-600 fill-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-gray-400">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </section>

        {/* Review Form */}
        <section className="bg-gray-800 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-8">Write a Review</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-4">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`w-10 h-10 cursor-pointer transition-colors ${
                      rating <= selectedRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600 fill-gray-600 hover:fill-yellow-500/20"
                    }`}
                    onClick={() => setSelectedRating(rating)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium mb-4">
                Your Review
              </label>
              <textarea
                {...register("review", {
                  required: "Review is required",
                  minLength: {
                    value: 10,
                    message: "Review must be at least 10 characters",
                  },
                })}
                className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg 
                  focus:ring-2 focus:ring-red-600 focus:border-transparent
                  text-gray-300 placeholder-gray-600"
                rows={5}
                placeholder="Share your detailed thoughts about the movie..."
              />
              {errors.review && (
                <p className="text-red-500 mt-2">{errors.review.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              Submit Review
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MovieDescription;