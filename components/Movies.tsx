import moviesStyles from "../styles/Movies.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading]= useState(true);
  const [query, setQuery] = useState("");

  async function getAllMovies(): Promise<void> {
    setLoading(true);
    const getMoviesData: Response = await fetch("https://api.jikan.moe/v4/anime");
    const getMovies: any = await getMoviesData.json();
    const movies:  Array<never> = getMovies.data;
    setMovies(movies);
    setLoading(false);
  }

    interface Movie {
    images: any;
    mal_id: number;
    title: string;
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className={moviesStyles.movies__container}>
      <input
        type="text"
        placeholder="Search movie or series"
        id={moviesStyles.movie__input}
        onKeyUp={(e) => setQuery(e.currentTarget.value)}
      />
      <h1 className={moviesStyles.movies__resultTitle}>Results: </h1>
      <div className={moviesStyles.movies__wrapper}>
        <>
          {loading ? (
            <div className={moviesStyles.loading__wrapper}>
              <div className={moviesStyles.loading__spinner}></div>
            </div>
          ) : (
            movies
              .filter((movie: Movie) => movie.title.toLowerCase().includes(query))
              .map((movie: Movie, index: number) => (
                <Link
                  href="/movie/[id]"
                  as={`/movie/${movie.mal_id}`}
                  key={index}
                >
                  <figure className={moviesStyles.movies__imgWrapper}>
                    <img
                      src={`${movie.images.jpg.image_url}`}
                      alt=""
                      className={moviesStyles.movies__img}
                    />
                  </figure>
                </Link>
              ))
          )}
        </>
      </div>
    </div>
  );
}

export default Movies;

// export const getStaticProps: GetStaticProps = async (movies: object) => {
//   const res: any = await fetch("https://jsonplaceholder.typicode.com/users");
//   movies = await res.json();
//   return {
//     props: {
//       movies,
//     },
//   };
// };
