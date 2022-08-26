import React from 'react';

import Movies from './movies';
import classes from './MovieList.module.css';

const MovieList = (props) => {
    return (
        <ul className={classes['movies-list']}>
            {props.movies.map((movie) => (
                <Movies
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                    openingText={movie.openingText}
                    isretry={props.isretry}
                />
            ))}
        </ul>
    );
}

export default MovieList;