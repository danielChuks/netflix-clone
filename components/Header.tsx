import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const {logout} = useAuth()
/**
 * The use effect takes the handleScroll function to know is window.scrollY is greater than zero i.e was the screen scrolled.
 * The EventListener is waiting to know if there is a change in the event i.e was there any change in the Event, 
 * If there is a change in the event, set the new value to the isScrolled.
 */
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
      
  }, [])
  return (

    <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className="flex item-center space-x-2 md:space-x-10">
            <img 
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
            />
        <ul className="hidden space-x-4 md:flex m-5">
            <li className="headerLink">Home</li>
            <li className="headerLink">Tv Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My list</li>
        </ul>
        </div>

        <div className='flex space-x-4 font-light text-sm'>
          <MagnifyingGlassIcon className='hidden sm:inline w-6 h-6' />
          <p className='hidden lg:inline'>kids</p>
          <BellIcon className=' w-6 h-6'/>
          {/* <Link href={'/account'}>  */}
            <img
            onClick={logout}
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded"
            />
          {/* </Link> */}
        </div>
    </header>
  )
}

export default Header