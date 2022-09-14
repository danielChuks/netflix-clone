import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { Movie } from '../typings'
import request from '../utils/request'
import Row from '../components/Row';
import useAuth from '../hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[],
  topRated: Movie[], 
  actionMovies : Movie[],
  horrorMovies : Movie[],
  comedyMovies : Movie[],
  romanceMovies : Movie[],
  documentaries : Movie[],
}

/**
 * we take the type values from the typing.d.ts file and assign it to 
 * @param param 
 * @returns The value of the movies we get from the results.....
 */
const Home = ({
      netflixOriginals,
      trendingNow, 
      topRated, 
      actionMovies, 
      horrorMovies, 
      comedyMovies,
      romanceMovies,
      documentaries} : Props) => {

        /// we want the home page 
      const {loading, logout } = useAuth()
        if(loading) return null

        // bringing the default modal state from the atoms & modalAtoms folder
      const showModal = useRecoilValue(modalState)

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home Netflix </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>  

      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals}/>
      <section className='space-y-15'>
        <Row title="Trending Now" movies={trendingNow}/>
        <Row title="Top Rated" movies={topRated}/>
        <Row title="Action Movies" movies={actionMovies}/>

        {/* My list */}

        <Row title="Comedy Movies" movies={comedyMovies}/>
        <Row title="Horror Movies" movies={horrorMovies}/>
        <Row title="Romance Movies" movies={romanceMovies}/>
        <Row title="Documentries" movies={documentaries}/>

      </section>
         {showModal && <Modal />}
        </main>
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const [
          netflixOriginals,
          trendingNow, 
          topRated, 
          actionMovies, 
          horrorMovies, 
          comedyMovies,
          romanceMovies,
          documentaries
        ] = await Promise.all([
          fetch(request.fetchNetflixOriginals).then((res) => res.json()),
          fetch(request.fetchTrending).then((res) => res.json()),
          fetch(request.fetchTopRated).then((res) => res.json()),
          fetch(request.fetchActionMovies).then((res) => res.json()),
          fetch(request.fetchHorrorMovies).then((res) => res.json()),
          fetch(request.fetchRomanceMovies).then((res) => res.json()),
          fetch(request.fetchComedyMovies).then((res) => res.json()),
          fetch(request.fetchDocumentaries).then((res) => res.json())
        ])

      return {
        props: {
          netflixOriginals: netflixOriginals.results,
          trendingNow: trendingNow.results,
          topRated: topRated.results,
          actionMovies: actionMovies.results,
          horrorMovies: horrorMovies.results,
          comedyMovies: comedyMovies.results,
          romanceMovies: romanceMovies.results,
          documentaries: documentaries.results
        }
      }
}
