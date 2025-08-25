import Image from "next/image";

const UserInformation = () => {
  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-10">User Information</h2>
      {/* form */}
      <article className="w-[50%] bg-white rounded-lg custom-shadow">
        <div className="w-full h-24 rounded-t-lg bg-primary-200 relative">
          <div className="w-full h-full rounded-t-lg relative overflow-hidden">
            <div className="absolute w-32 h-32 rounded-full bg-primary-500/30 -left-5 -top-20"></div>
            <div className="absolute w-32 h-32 rounded-full bg-primary-500/30 left-[10%] -top-16"></div>
            <div className="absolute w-32 h-32 rounded-full bg-primary-500/30 left-[50%] -top-16"></div>
            <div className="absolute w-32 h-32 rounded-full bg-primary-500/30 left-[35%] top-5"></div>
            <div className="absolute w-32 h-32 rounded-full bg-primary-500/30 left-[75%] -top-16"></div>
            <div className="absolute w-32 h-32 rounded-full bg-primary-500/30 left-[80%] top-5"></div>
          </div>
          {/* image */}
          <div className="w-28 h-28 rounded-full bg-secondary-200 absolute top-10 left-5 flex justify-center items-center overflow-hidden custom-shadow">
            <Image
              src="/UI-images/User.png"
              alt="user"
              fill
              className="object-contain"
            />
          </div>
          <p className="absolute top-[100%] left-36 font-semibold text-lg text-secondary-500">
            Masiha Mohammadpour
          </p>
        </div>
        <div className="mt-20 w-full flex justify-center items-center">
          <form className="flex flex-col">
            <label htmlFor="name" className="text-secondary-500 mb-3">
              User Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-secondary-200 mb-5 w-96 rounded-lg custom-shadow border-0 outline-0 p-2"
              autoComplete="off"
            />
            <label htmlFor="email" className="text-secondary-500 mb-3">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-secondary-200 mb-10 w-96 rounded-lg custom-shadow border-0 outline-0 p-2"
              autoComplete="off"
            />
            <button className="w-96 rounded-lg bg-primary-200 text-white mb-10 p-2 cursor-pointer custom-shadow">
              Update
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UserInformation;
