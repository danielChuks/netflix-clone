import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
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
    <MuiModal 
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        open={showModal} 
        onClose={handleClose}> 
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
              <div>
                <button className='flex item-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6'>
                  <FaPlay className="h-7 w-7 text-black"/>
                    Play
                </button>
                <button className='modalButton'>
                  <PlusIcon />
                </button>
              </div>
            </div>
        </>
    </MuiModal>
  )
}

export default Modal;

