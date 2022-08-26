import React, { useState, useEffect, useCallback } from "react";

import MovieList from "./MovieList";
import classes from "./AvailableMovies.module.css";
import AddMovieForm from "./AddMovieForm";
const AvailableMovie = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setretry] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://ecommerce-website-82afa-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong! retring...");
      }
      const data = await response.json();
      console.log(data);

      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      // const transformedMovies = data.results.map((movieData) => {
      //     return {
      //         id: movieData.episode_id,
      //         title: movieData.title,
      //         openingText: movieData.opening_crawl,
      //         releaseDate: movieData.release_date,
      //     };
      // });
      setMovies(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler, retry]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MovieList isretry={setretry} movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section className={classes.section}>
        <AddMovieForm isLoadAgain={setretry} />
        <button onClick={fetchMoviesHandler} className={classes.button}>
          Fetch Movies
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

export default AvailableMovie;
