import { XMarkIcon } from '@heroicons/react/24/outline'
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'


function Modal() {
    const [showModal, setShowModal ] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [data, setData] = useState()

    ///This useEffect is going to ensure we fetch the videos
    useEffect (() => {
        if(!movie) return

        async function fetchMovie(){
            const data = await fetch(`https://api.themoviedb.org/3/${
                movie?.media_type === 'tv' ? 'tv' : 'movie'
              }/${movie?.id}?api_key=${
                process.env.NEXT_PUBLIC_API_KEY
              }&language=en-US&append_to_response=videos`
            )
            .then((response) => response.json())
            .catch((error) => console.log(error.message))
            
            setData(data)
            
        }
        fetchMovie()
    }, [movie])
    console.log(data);

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
            <div>

            </div>
        </>
    </MuiModal>
  )
}

export default Modal

