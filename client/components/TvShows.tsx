import React from 'react'

interface Props {
  shows: any
}

function TvShows(props: Props) {
  const popularShows = props.shows.popular.results
  const trendingShows = props.shows.trending.results
  const topRatedShows = props.shows.topRated.results

  return (
    <div>
      <div>
        <div className="flex flex-wrap gap-4">
          {topRatedShows.map((show) => (
            <>
              <div>
                {/* <p key={movie.id}>{movie.title}</p> */}
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt=""
                  width="200px"
                />
                <p>{`ID: ${show.id}`}</p>
              </div>
            </>
          ))}
          <h2>Upcoming Movies</h2>
          {trendingShows.map((show) => (
            <>
              <div>
                {/* <p key={movie.id}>{movie.title}</p> */}
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt=""
                  width="200px"
                />
                <p>{`ID: ${show.id}`}</p>
              </div>
            </>
          ))}
          {popularShows.map((show) => (
            <>
              <div>
                {/* <p key={movie.id}>{movie.title}</p> */}
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt=""
                  width="200px"
                />
                <p>{`ID: ${show.id}`}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TvShows
