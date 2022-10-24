import Navbar from "../../../components/Navbar";
import movieInfoStyles from "../../../styles/MovieInfo.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
function movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id }: any = router.query;
  async function getAllMovies(): Promise<void> {
    setLoading(true);
    const getMoviesData: Response = await fetch(
      "https://api.jikan.moe/v4/anime"
    );
    const getMovies: any = await getMoviesData.json();
    const movies: Array<never> = getMovies.data;
    setMovies(movies);
    setLoading(false);
  }

  interface Movie {
    images: any;
    jpg: object;
    mal_id: number;
    title: string;
    name: string;
    synopsis: string;
    episodes: number;
    score: number;
    rating: string;
    duration: string;
    genres: any;
    studios: any;
    trailer: any;
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <>
      <Navbar />
      <div className={movieInfoStyles.movie__infoContainer}>
        <Link href="/home">
          <button className={movieInfoStyles.movie__backButton}>← Back</button>
        </Link>
        {loading ? (
          <div className={movieInfoStyles.loading__wrapper}>
            <div className={movieInfoStyles.loading__spinner}></div>
          </div>
        ) : (
          movies
            .filter((movie: Movie) => +movie.mal_id === +id)
            .map((movie: Movie, index: any) => (
              <div className={movieInfoStyles.movie__info} key={index}>
                <img src={`${movie.images.jpg.image_url}`} alt="" />
                <h1>Title: {movie.title}</h1>
                <h2>Episodes: {movie.episodes}</h2>
                <h2>Score: {movie.score}</h2>
                <h2>Rating: {movie.rating}</h2>
                <h2>Duration: {movie.duration}</h2>
                <h2>Genres: {movie.genres[0].name}</h2>
                <h2>Studios: {movie.studios[0].name}</h2>
                <p className={movieInfoStyles.movie__synopsis}>
                  Synopsis: {movie.synopsis}
                </p>
                {movie.trailer.url ? (
                  <a
                    href={movie.trailer.url}
                    target="_blank"
                    rel="noreferrer"
                    className={movieInfoStyles.movie__trailer}
                  >
                    Trailer: {movie.trailer.url}
                  </a>
                ) : (
                  "No trailer available :("
                )}
              </div>
            ))
        )}
      </div>
    </>
  );
}

export default movie;
