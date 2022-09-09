import Head from "next/head";
import Image from 'next/image';
import { useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";

// creating a type script input type 

interface Inputs {
  email: string,
  password: string
}

function Login() {
  const [login, setLogin] =useState(false);

  const { register, 
          handleSubmit, 
          formState: { errors } 
      } = useForm<Inputs>();
      const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center  md:bg-transparent">
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

        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="relative rounded mt-24 space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
          <h1 className="text-4xl font-semibold"> Sign in </h1>
            <div className="space-y-4">
             <label className="inline-block w-full">
                <input 
                  {...register("email", {required: true})}
                  className="input" 
                  type="email" 
                  placeholder="Email"/>
                  {errors.email && (
                    <p className="p-1 text-[13px] font-inline text-orange-500">Invalid email submission</p>
                    )}
              </label>  
             <label className="inline-block w-full">
                <input 
                  {...register("password", {required: true})}
                  className="input" 
                  type="password" 
                  placeholder="Password"/>
                  {errors.password && ( 
                    <p className="p-1 text-[13px] font-inline text-orange-500">Inavild password submission</p>
                  )}
             </label>
          </div>
          <button className="w-full rounded bg-[#e50914] py-3"> Sign in </button>
          <div className="text-[gray]">
            New to Netflix ? {''}
            <button type="submit"  className="text-white hover:underline">Sign up now</button>
          </div>
        </form>
      </div>

      
  )
}

export default Login;