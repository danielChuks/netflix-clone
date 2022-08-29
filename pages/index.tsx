import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { Movie } from '../typings'
import request from '../utils/request'

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
        console.log(netflixOriginals)
  return (
    <div className="relative h-screen bg-gradient-to-b  from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>  

      <main>
        <Banner netflixOriginals={netflixOriginals} />

      <section>
        {/* {row} */}
        {/* {row} */}
        {/* {row} */}
        {/* {row} */}
        {/* {row} */}
        {/* {row} */}
        {/* {row} */}
      </section>
          {/* model */}
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
