import { useEffect, useState } from 'react';
import Movie from  './components/Movie';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=44346d7d3ab51accb2a7fa7cbd937920&page=1'

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=44346d7d3ab51accb2a7fa7cbd937920&query='

function App() {
  const [movies, setMovies] = useState([])
  const [searchterm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies(data.results)
      })
  })

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if(searchterm) {

      fetch(SEARCHAPI+searchterm)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies(data.results)
      })

      setSearchTerm('')
    }
  }

  const getMovies = (e) => {
    fetch(SEARCHAPI+searchterm)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setMovies(data.results)
    })

    setSearchTerm('')
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return ( 
    <>
      <header>
      <form OnSubmit={handleOnSubmit}>
        <input className='search'
              type="text"  
              placeholder='Search...'
              value={searchterm}
              onChange={handleOnChange}
          />
      </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 && 
        movies.map((movie) => <Movie key={movie.id} {...movie} />
        )}
      </div>
    </>
  );
}

export default App;
