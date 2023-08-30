"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BsPlayFill } from "react-icons/bs";

const Home = () => {
  interface IMovie {
    Poster: string;
    Title: string;
    Genres:string;
    Language: string;
    Released: string;
    Runtime: string;
    imdbRating: string;
    Plot: string;
  }

  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [movie, setMovie] = useState<IMovie>();;

  useEffect(() => {
    setIsLoading(true);
    setIsImgLoading(true);

    let searchMovie = searchParams ? searchParams.get("movie") : null;

    if (searchMovie === null) {
      searchMovie = "shrek";
    }

    axios
      .get(`http://www.omdbapi.com/`, {
        params: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
          t: searchMovie,
        },
      })
      .then((res) => {
        if(res.data.Response === "false"){
            setIsLoading(false)
            console.log("no se encontraron peliculas")
            return;
        }
        const movieData = {
        Poster: res.data.Poster,
        Title: res.data.Title,
        Genres: res.data.Genre,
        Language: res.data.Language,
        Released: res.data.Released,
        Runtime: res.data.Runtime,
        imdbRating: res.data.imdbRating,
        Plot: res.data.Plot,
        };

        setMovie(movieData);
        setIsLoading(false);
        console.log(movieData)
      });
  }, [searchParams]);

  return (
    <div>
      {isLoading && <Loading />}

      <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative px-10">
        <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-20">
          <div className="mx-auto flex-none relative">
            <Image
              src={movie?.Poster || "/imageNotFound.jpg"}
              width={700}
              height={700}
              className="w-[300px] object-cover"
              alt="imagen pelicula"
              onLoadingComplete={() => setIsImgLoading(false)}
              priority
            />
            {isImgLoading && <Loading />}
          </div>

          <div className="space-y-6">
            <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
              {movie?.Title}
            </div>

            <div className="flex gap-4 flex-wrap">Genero: 
               {" "}{movie?.Genres}
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div>Valoración: {movie?.imdbRating} ⭐</div>
              <div>Duración: {movie?.Runtime}</div>
              <div>Fecha de lanzamiento: {movie?.Released}</div>
            </div>

            <div className="pt-1 space-y-1 pr-4">
              <div className="text-lg">Descripción:</div>
              <div className="lg:line-clamp-4">{movie?.Plot}</div>
            </div>

            <div className="inline-block pt-6 cursor-pointer">
            <a href={`https://www.youtube.com/results?search_query=${movie?.Title} trailer`} target='_blank' rel='noopener noreferrer'>
              <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                 <BsPlayFill size={24} />
                Ver trailer
              </div>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;