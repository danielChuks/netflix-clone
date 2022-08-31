import { Movie } from "../typings"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { baseUrl } from "../constants/movies"

interface Props {
    netflixOriginals: Movie[]
}
 
function Banner({netflixOriginals}: Props) {
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);

    }, [netflixOriginals]);
    console.log('wer', movie);
    
  return (
    <div>
        <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
            <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            layout="fill"
            objectFit="cover"
            />
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-7xl">
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="">
            {movie?.overview}
        </p>
    </div>
  )
}

export default Banner