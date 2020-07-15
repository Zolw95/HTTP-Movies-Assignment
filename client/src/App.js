import React, { useState, useEffect, useHistory } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import axios from 'axios';

import { createBrowserHistory } from 'history';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  // const deleteMovie = (id) => {
  //   axios
  //     .delete(`http://localhost:5000/api/movies/${id}`)
  //     .then((res) => {
  //       history.push('/');
  //       getMovieList();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/'>
        <MovieList movies={movieList} />
      </Route>

      <Route path='/movies/:id'>
        <Movie
          addToSavedList={addToSavedList}
          moveList={movieList}
          setMovieList={setMovieList}
          getMovieList={getMovieList}
        />
      </Route>
      <Route
        path='/update-movie/:id'
        render={() => (
          <UpdateMovie
            movieList={movieList}
            setMovieList={setMovieList}
            getMovieList={getMovieList}
          />
        )}
      />
    </>
  );
};

export default App;
