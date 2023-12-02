import React from 'react'

function Trailer(props: Props) {
  return (
    <div
    //  className="h-screen bg-black text-white flex items-center justify-center"
    >
      {' '}
      <iframe
        title=" "
        id="player"
        className="
  w-full aspect-video"
        // absolute z-10 w-auto
        // min-w-full min-h-full max-w-none
        frameBorder="0"
        allowFullScreen
        src={
          // {`${youtubeLink}${trailer}`}
          `http://www.youtube.com/embed/${props.trailer}?autoplay=1&controls=0&enablejsapi=1&origin=http://example.com`
        }
      ></iframe>
    </div>
  )
}

export default Trailer
