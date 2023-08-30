"use client";
import React from "react";
import "../app/globals.css";
import { useEffect, useState } from "react";
import {logout, login, register} from "../services/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(false);
  
    useEffect(() => {
      logout();
    }, []);
  
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handlePasswordConfirmChange = (e:React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
       if (await register(email, password, passwordConfirm)){
        router.push('/')
      } else setError(true);
    };
  
    return (
      <div>
        <div className="bg-zinc-900 flex flex-col items-center justify-center min-h-screen">
          <div className="mb-20">
          <Image className="" width={400} height={100} alt='logo' src='/Logo.png'></Image>
          </div>
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md md:w-1/3 w-full mx-10 ">
            <h1 className="text-2xl font-semibold mb-4 text-black text-center">Registrarse</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="block text-sm font-medium text-gray-700">Correo Electrónico</p>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="mt-1 p-2 w-full rounded-md border border-black text-black"
                />
              </div>
              <div>
                <p className="block text-sm font-medium  text-gray-700">Contraseña</p>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 p-2 w-full rounded-md border border-black text-black"
                />
              </div>
              <div>
                <p className="block text-sm font-medium  text-gray-700">Confirmar contraseña</p>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  className="mt-1 p-2 w-full rounded-md border border-black text-black"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Registrarse
              </button>
            </form>
            <div className="text-center mt-2 text-black">
              <p>¿Ya tienes una cuenta?</p>
              <Link href="/Login"><p className="">Iniciar sesion ahora</p></Link>
              {error && <p className="text-red-600">Todos los campos son obligatorios</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;