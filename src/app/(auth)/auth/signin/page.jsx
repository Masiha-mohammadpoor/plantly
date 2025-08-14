"use client";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Input from "@/app/components/Input";
import Link from "next/link";

const Signin = () => {

  return (
    <section className="flex">
      <article className="h-screen w-[50%] bg-primary-200 rounded-r-[120px] flex flex-col justify-center items-center">
        <h1 className="text-white text-6xl font-semibold pb-6">
          Welcome Back!
        </h1>
        <p className="max-w-80 break-words overflow-hidden text-center text-white pb-6">
          Enter your personal details to use all of site features
        </p>
        <h3 className="text-xl text-white pb-6">Or</h3>
        <Link href="/auth/signup">
          <button className="text-white cursor-pointer border-2 border-white rounded-lg py-1 px-7">
            SIGN UP
          </button>
        </Link>
      </article>
      <article className="w-[50%] h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-semibold pb-3">Login To The Account</h2>
        <div className="flex gap-x-2 pb-3">
          <button className="cursor-pointer w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaGoogle />
          </button>
          <button className="cursor-pointer w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaGithub />
          </button>
          <button className="cursor-pointer w-10 h-10 flex justify-center items-center border-2 border-secondary-500 rounded-lg text-secondary-500">
            <FaLinkedinIn />
          </button>
        </div>
        <p className="text-secondary-500 text-sm pb-3">
          or use your email for login
        </p>
        <form className="flex flex-col items-center justify-center">
          <Input name="email" placeholder="email..." />
          <Input name="password" placeholder="password..." type="password" />
          <button
            className="bg-primary-200 text-white rounded-lg cursor-pointer py-2 w-full"
            type="submit"
          >
            SIGN IN
          </button>
        </form>
      </article>
    </section>
  );
};

export default Signin;
