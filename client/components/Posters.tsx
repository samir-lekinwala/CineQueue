import { NavHashLink } from 'react-router-hash-link'

function Posters(props: Props) {
  const { type, content } = props
  const tmdbPosterLink = `https://image.tmdb.org/t/p/w500/`

  function getReleaseYear() {
    if (content.release_date) {
      const result = content.release_date.split('-')[0]

      return result
    } else if (content.first_air_date) {
      const result = content.first_air_date.split('-')[0]

      return result
    } else return 'Release date unknown'
  }

  return (
    <div>
      <NavHashLink to={`/details/${type}/${content.id}#trailer`}>
        {!content.poster_path || content.poster_path == 'null' ? (
          <>
            <div className="relative">
              <img
                alt={content.title ? `${content.title}` : `${content.name}`}
                src="/client/images/blank-poster.jpg"
                className="w-52"
              ></img>
              <div className="text-white absolute top-1/4">
                <p>{content.title ? `${content.title}` : `${content.name}`}</p>
                <p>{`${getReleaseYear()}`}</p>
              </div>
            </div>
          </>
        ) : (
          <div>
            <img
              src={`${tmdbPosterLink}${content.poster_path}`}
              alt=""
              className="w-52 rounded dark:shadow-gray-800"
            />
          </div>
        )}
      </NavHashLink>
      {/* <p>{`ID: ${content.id}`}</p> */}
    </div>
  )
}

export default Posters
