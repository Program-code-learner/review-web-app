import Nav from "./Nav";
import axios from "axios";
import { Star, PlayCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieRating {
  movieId: number;
  rating: number;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const fetchFeatured = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=5ccc82179e7fab101470f4ac44ebc515"
  );
  return response.data.results;
};

const fetchMovies = async (endpoint: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${endpoint}?api_key=5ccc82179e7fab101470f4ac44ebc515`
  );
  return response.data.results;
};

const Home = () => {
  const navigate = useNavigate();

  const { data: featuredMovies, isLoading: isFeaturedLoading } = useQuery<
    Movie[]
  >({
    queryKey: ["featured"],
    queryFn: fetchFeatured,
  });

  const { data: popularMovies, isLoading: isPopularLoading } = useQuery<
    Movie[]
  >({
    queryKey: ["popular"],
    queryFn: () => fetchMovies("popular"),
  });

  const { data: topRatedMovies, isLoading: isTopRatedLoading } = useQuery<
    Movie[]
  >({
    queryKey: ["topRated"],
    queryFn: () => fetchMovies("top_rated"),
  });

  const { data: upcomingMovies, isLoading: isUpcomingLoading } = useQuery<
    Movie[]
  >({
    queryKey: ["upcoming"],
    queryFn: () => fetchMovies("upcoming"),
  });

  const { data: movieRatings } = useQuery<MovieRating[]>({
    queryKey: ["movieRating"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8080/reviews");
      return res.data;
    },
  });

  const getRatingForMovie = (movieId: number) => {
    const movieReviews =
      movieRatings?.filter((review) => review.movieId === movieId) || [];
    if (movieReviews.length === 0) return 0;
    const totalRating = movieReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return Number((totalRating / movieReviews.length).toFixed(1));
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`, { state: movie });
  };

  if (
    isFeaturedLoading ||
    isPopularLoading ||
    isTopRatedLoading ||
    isUpcomingLoading
  ) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Nav />
        <div className="space-y-8">
          <Skeleton className="h-screen w-full" />
          <div className="container space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Carousel>
                  <CarouselContent>
                    {[...Array(6)].map((_, j) => (
                      <CarouselItem
                        key={j}
                        className="basis-1/3 md:basis-1/4 lg:basis-1/6"
                      >
                        <Skeleton className="h-64 w-full" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const featuredMovie = featuredMovies?.[0];

  return (
    <div className="min-h-screen bg-gray-900">
      <Nav />

      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <img
          src={`${TMDB_IMAGE_BASE_URL}${featuredMovie?.backdrop_path}`}
          alt={featuredMovie?.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 container px-4 pb-16 space-y-4">
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl">
            {featuredMovie?.title}
          </h1>
          <p className="text-lg text-white line-clamp-3 max-w-2xl drop-shadow-2xl">
            {featuredMovie?.overview}
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="gap-2 cursor-pointer text-lg bg-red-600 hover:bg-red-700"
            >
              <PlayCircle className="w-6 h-6 " /> Play
            </Button>
          </div>
        </div>
      </div>

      {/* Movie Carousels */}
      <div className="container px-4 space-y-12 py-12">
        <CarouselSection
          title="Popular on Netflix"
          movies={popularMovies}
          onMovieClick={handleMovieClick}
          getRating={getRatingForMovie}
        />
        <CarouselSection
          title="Top Rated"
          movies={topRatedMovies}
          onMovieClick={handleMovieClick}
          getRating={getRatingForMovie}
        />
        <CarouselSection
          title="Coming Soon"
          movies={upcomingMovies}
          onMovieClick={handleMovieClick}
          getRating={getRatingForMovie}
        />
      </div>
    </div>
  );
};

interface CarouselSectionProps {
  title: string;
  movies?: Movie[];
  onMovieClick: (movie: Movie) => void;
  getRating: (movieId: number) => number;
}

const CarouselSection = ({
    title,
    movies,
    onMovieClick,
    getRating,
  }: CarouselSectionProps) => {
    const plugin = React.useRef(
      Autoplay({
        delay: 2000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      })
    );
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {movies?.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div
                    onClick={() => onMovieClick(movie)}
                    className="group relative cursor-pointer transform transition duration-300 hover:scale-105"
                  >
                    <img
                      src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover rounded-lg shadow-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-gray-900 to-transparent rounded-lg">
                      <h3 className="text-white font-semibold line-clamp-1">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-1 text-white">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>
                          {getRating(movie.id) || movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-0 top-1/2 transform border-amber-300 text-amber-300 -translate-y-1/2" />
            <CarouselNext className="absolute -right-0 top-1/2 transform border-amber-300 text-amber-300 -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    );
  };
  

export default Home;
