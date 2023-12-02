import { NavHashLink } from 'react-router-hash-link'

function Posters(props: Props) {
  const { type, content } = props
  const tmdbPosterLink = `https://image.tmdb.org/t/p/w500/`
  return (
    <div>
      <NavHashLink to={`/details/${type}/${content.id}#trailer`}>
        <img
          src={`${tmdbPosterLink}${content.poster_path}`}
          alt=""
          width="200px"
          className="rounded"
        />
      </NavHashLink>
      <p>{`ID: ${content.id}`}</p>
    </div>
  )
}

export default Posters
