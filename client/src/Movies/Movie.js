import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Route, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

import UpdateMovie from './UpdateMovie';

function Movie({ addToSavedList, getMovieList }) {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        getMovieList();
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const delMovie = () => {
    deleteMovie(movie.id);
  };

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div>
      <div className='save-wrapper'>
        <MovieCard movie={movie} />

        <div className='save-button' onClick={saveMovie}>
          Save
        </div>
        <button
          className='md-button'
          onClick={() => history.push(`/update-movie/${movie.id}`)}
        >
          Edit
        </button>
        <button
          className='md-button'
          onClick={delMovie}
          // onClick={() => push(`/update-movie/${movie.id}`)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Movie;
