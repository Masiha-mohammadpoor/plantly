import Image from "next/image";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import "./globals.css";

const NotFound = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-y-4">
      <div className="w-[300px] h-[300px] relative">
        <Image
          src="/UI-images/not-found.svg"
          alt="404"
          fill
          className="absolute"
        />
      </div>
      <h2 className="text-5xl">Page Not Found</h2>
      <Link
        href="/"
        className="text-primary-200 text-lg flex items-center gap-x-2"
      >
        Go to home page <GoHome />
      </Link>
    </section>
  );
};

export default NotFound;
