interface Props {
  trailer: string
}

function Trailer(props: Props) {
  return (
    <div id="trailer">
      {' '}
      <iframe
        title=" "
        id="player"
        className="
  w-full aspect-video"
        frameBorder="0"
        allowFullScreen
        src={`http://www.youtube.com/embed/${props.trailer}?autoplay=1&controls=0&enablejsapi=1&origin=http://example.com`}
      ></iframe>
    </div>
  )
}

export default Trailer
