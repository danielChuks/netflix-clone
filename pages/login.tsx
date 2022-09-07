import Head from "next/head";
import Image from 'next/image';

function Login() {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:item-center md: justify-center  md:bg-transparent">
      <Head>
        <title> Netflix </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image src={"https://rb.gy/p2hphi"} 
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

        <img 
          className="absolute left-4 top-4 cursor-pointer md:left-8 md:top-4"
          src="https://rb.gy/ek4j9f" width={150} height={150} />

        <form className="relative rounded mt-24 space-y-8 bg-black/75 py-10 px-10 md:top">
          <h1> Sign in</h1>
            <div>
             <label>
                <input className="" type="email" placeholder="Email" />
              </label>

             <label>
              
             </label>
          </div>
        </form>
      </div>

      
  )
}

export default Login;