import React from "react";
import { auth } from "../auth";
import Link from "next/link";
import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";

const HomePage = async () => {
  const session = await auth();

  return (
    <div>
      <Navbar serverUser={session?.user || null} session={session}/>
      <section className="w-full flex items-center justify-center flex-col">
        <h1 className="mt-6 text-5xl font-extrabold leading-[1.15] text-gray-800 sm:text-6xl text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className=" bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center">
            {" "}
            AI-Powered Prompts
          </span>
        </h1>
        <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center">
          Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
        </p>
        {!session ? (<button className="mt-6 bg-amber-600 px-5 py-2 text-md shadow-amber-200 rounded">
          <Link href='/sign-up'>Get Started</Link>
        </button>) : ''}

        <Feed session={session}/>
      </section>
    </div>
  );
};

export default HomePage;
