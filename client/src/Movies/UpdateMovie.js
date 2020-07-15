import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';

const UpdateMovie = (props) => {
  const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: ['test'],
  };

  const { push } = useHistory();
  const { id } = useParams();
  const [updatedMovie, setUpdatedMovie] = useState(initialMovie);

  const onChange = (e) => {
    e.persist();
    setUpdatedMovie({
      ...updatedMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
      .then((res) => {
        const editedList = [...props.movieList];
        editedList.map((movie) => {
          if (movie.id === res.data.id) return res.data.id;
          else return movie.id;
        });
        props.setMovieList([...editedList]);
        props.getMovieList();
        push('/');
      })
      .catch((err) => console.log(err));
  };

  console.log('movielist', MovieList);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Update Movie</h2>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={updatedMovie.title}
          onChange={onChange}
        />
        <input
          type='text'
          name='director'
          placeholder='Director'
          value={updatedMovie.director}
          onChange={onChange}
        />
        <input
          type='text'
          name='metascore'
          placeholder='metascore'
          value={updatedMovie.metascore}
          onChange={onChange}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
