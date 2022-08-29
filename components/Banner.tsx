import { Movie } from "../typings"
import Image from 'next/image'
import { useEffect, useState } from "react"

interface Props {
    netflixOriginals: Movie []
}
 
function Banner({netflixOriginals}: Props) {
    const [movie, setMovie] = useState<Movie | null>(null)

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);

    }, [netflixOriginals]);
    console.log(movie);
  return (
    <div>
        <div>
            <Image src={`${baseUrl} ${movie?.backdrop_path || movie?.poster_path}`}/>
        </div>
    </div>
  )
}

export default Banner