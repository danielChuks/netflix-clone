import { XMarkIcon } from '@heroicons/react/24/outline'
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Element, Genre } from '../typings'

function Modal() {
    const [showModal, setShowModal ] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState("")
    const [genres, setGenres] = useState<Genre[]>([])


    ///This useEffect is going to ensure we fetch the videos
   useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])
  console.log(trailer)

    //helper function that willhelp us close the modal........
    const handleClose = () => {
        setShowModal(false)
    }

  return (
    <MuiModal open={showModal} onClose={handleClose}> 
        <>
            <button onClick={handleClose} className="modalButton absolute right-5 top-5 !z-40 h-6 w-6 border-none bg-[#181818] hover:bg-[#181818]">
                <XMarkIcon />
            </button>
            {/* the style included on the react player div is the required style recomended in the reactPlayer docs */}
            <div className='relative pt-[56.25%]'>
                <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: '0', left: '0' }}
                playing
                // muted={muted}
              />
            </div>
        </>
    </MuiModal>
  )
}

export default Modal;

