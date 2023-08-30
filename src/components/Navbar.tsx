"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getUser } from '../services/auth';
import { FaSearch } from "react-icons/fa";

interface NavbarProps {
  user: string | null; // Actualiza el tipo según el tipo real de user
}

export function Navbar({user}:NavbarProps) {
  const [input, setInput] = useState("");
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);


  useEffect(() => {
    const user = getUser();
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

  const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    input ? router.push(`?movie=${input}`) : router.push("");
    setInput("");
  };

  return (
    <div className="bg-primary py-4 px-4 md:px-0 relative">
      <div className="container mx-auto flex justify-between flex-col md:flex-row items-center md:justify-between md:items-center">
        <Link href="/">
          <div>
          <Image
            className="mb-2 md:mb-0"
            src="/logo.png"
            width={200}
            height={200}
            alt="logo"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          </div>
        </Link>
        <form onSubmit={searchMovie} className="flex items-center space-x-3">
          <div className="flex space-x-3">
            <input
              className="text-black px-4 py-1 md:py-2 rounded outline-none placeholder:text-textColor"
              type="text"
              value={input}
              placeholder="Buscar pelicula..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white rounded text-black py-2 px-2 hover:bg-textColor hover:text-black"
            >
              <FaSearch />
            </button>
          </div>
        </form>
        <div className="mt-3 md:mt-0">
           {userEmail && <p className="text-white flex items-center">Bienvenido: {userEmail} <Link href={'/Login'}><button className="ml-5 text-red-700">Salir</button></Link></p>}
           {!userEmail && <Link href={'/Login'}><button className="ml-5 text-white">Ingresar</button></Link>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;