import React from 'react'

interface Props {
  movies: any
}

function Movies(props: Props) {
  const popularMovies = props.movies.popular.results
  const upcomingMovies = props.movies.upcoming.results
  const topRatedMovies = props.movies.topRated.results

  return (
    <div>
      <div>
        <div className="flex flex-wrap gap-4">
          {popularMovies.map((movie) => (
            <>
              <div>
                {/* <p key={movie.id}>{movie.title}</p> */}
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                  width="200px"
                />
                <p>{`ID: ${movie.id}`}</p>
              </div>
            </>
          ))}
          <h2>Upcoming Movies</h2>
          {upcomingMovies.map((movie) => (
            <>
              <div>
                {/* <p key={movie.id}>{movie.title}</p> */}
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                  width="200px"
                />
                <p>{`ID: ${movie.id}`}</p>
              </div>
            </>
          ))}
          {topRatedMovies.map((movie) => (
            <>
              <div>
                {/* <p key={movie.id}>{movie.title}</p> */}
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                  width="200px"
                />
                <p>{`ID: ${movie.id}`}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Movies
