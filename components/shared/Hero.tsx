import React from "react";
import Wrapper from "./Wrapper";
import Image from "next/image";
import heroImage from "@/asset/image/hero.png";
import Link from "next/link";
const Hero = () => {
  return (
    <Wrapper className="h-full">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center md:flex-row">
          {/* Left Column (Text Content) */}
          <div className="text-center md:w-1/2 md:text-left lg:w-2/5">
            <span className="bg-opacity-20 rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-slate-100">
              Use AI to advance your career
            </span>
            <h1 className="mt-4 mb-4 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-6xl">
              Your Career Journey,{" "}
              <span className="bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Reimagined.
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-400">
              Leverage cutting-edge AI technology to create a standout resume
              that showcases your skills and experiences effortlessly.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-start">
              <Link href="/create-resume" className="hero-button">
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="mt-10 flex justify-center md:mt-0 md:w-1/2 lg:w-3/5">
            <div className="relative w-full max-w-lg">
              {/* You can replace this with your own image or an illustration */}
              <Image
                src={heroImage}
                alt="Resume Example"
                width={600}
                height={400}
                className="h-[400px] w-full rounded-lg shadow-2xl transition-all duration-500 ease-in-out hover:scale-105 sm:h-[300px] lg:h-[400px]"
              />
              <div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-purple-600 opacity-70 mix-blend-multiply blur-xl filter"></div>
              <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-blue-600 opacity-70 mix-blend-multiply blur-xl filter"></div>
              <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-600 opacity-70 mix-blend-multiply blur-xl filter"></div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Hero;
