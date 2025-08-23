"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchTerm(search);
  }, [searchParams]);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex justify-center w-screen"
    >
      <input
        value={searchTerm}
        onChange={searchHandler}
        onKeyPress={handleKeyPress}
        type="text"
        className="bg-white outline-0 px-5 py-2 w-[50%] rounded-l-full custom-shadow text-secondary-500"
        placeholder="plant name..."
      />
      <button
        type="submit"
        className="py-2 px-5 rounded-r-full shadow-2xl bg-white text-2xl text-secondary-500"
      >
        <HiOutlineSearch />
      </button>
    </form>
  );
};

export default Search;
