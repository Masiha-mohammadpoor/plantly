import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-end pt-2 px-8">
      <div className="flex justify-center items-end gap-x-1">
        <Image src="/images/Logo.png" alt="Logo" width={30} height={30} />
        <h2 className="text-primary-500 font-semibold text-base">PLANTLY</h2>
      </div>
      <div></div>
      <div>
        <ul className="flex justify-center items-center gap-x-10 text-secondary-500">
          <li>Home</li>
          <li>Products</li>
          <li>About Us</li>
          <li>Contact</li>
          <li>My Plant</li>
        </ul>
      </div>
      <div>
        <button className="text-sm text-white bg-primary-500 p-2 rounded-lg cursor-pointer hover:bg-primary-800 transition-all duration-300">
          Login / SignUp
        </button>
      </div>
    </header>
  );
};

export default Header;
