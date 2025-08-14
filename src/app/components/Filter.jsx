"use client";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaSortAmountDown } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoPricetagOutline } from "react-icons/io5";

const Filter = () => {
  const [category, setCategory] = useState(false);
  const [type, setType] = useState(false);
  const [sort, setSort] = useState(false);

  return (
    <article className="col-span-3">
      <h2 className="pb-6 text-secondary-500 text-lg font-semibold">
        Filter & Sort
      </h2>
      <div className="flex flex-col gap-y-4 overflow-y-auto">
        {/* category */}
        <div
          className={`transition-all duration-500 bg-white flex flex-col overflow-hidden custom-shadow rounded-lg ${
            category ? "max-h-[500px]" : "max-h-10"
          }`}
        >
          <div
            onClick={() => setCategory((prev) => !prev)}
            className="cursor-pointer bg-white py-2 px-2 flex justify-between items-center"
          >
            <div className="flex items-center gap-x-2">
              <BiCategoryAlt className="text-secondary-500" />
              <h2 className="font-semibold text-secondary-500">Category</h2>
            </div>
            <span className="text-lg text-secondary-500">
              <HiChevronDown />
            </span>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-x-4">
              <input
                type="checkbox"
                className="cursor-pointer accent-primary-200 w-4 h-4"
              />
              <p className="text-sm text-secondary-500 font-semibold">
                category - 1
              </p>
            </div>
          </div>
        </div>
        {/* type */}
        <div
          className={`transition-all duration-500 bg-white flex flex-col overflow-hidden custom-shadow rounded-lg ${
            type ? "max-h-[500px]" : "max-h-10"
          }`}
        >
          <div
            onClick={() => setType((prev) => !prev)}
            className="cursor-pointer bg-white py-2 px-2 flex justify-between items-center"
          >
            <div className="flex items-center gap-x-2">
              <IoPricetagOutline className="text-secondary-500" />
              <h2 className="font-semibold text-secondary-500">Type</h2>
            </div>
            <span className="text-lg text-secondary-500">
              <HiChevronDown />
            </span>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-x-4">
              <input
                type="checkbox"
                className="cursor-pointer accent-primary-200 w-4 h-4"
              />
              <p className="text-sm text-secondary-500  font-semibold">
                type - 1
              </p>
            </div>
          </div>
        </div>
        {/* sort */}
        <div
          className={`transition-all duration-500 bg-white flex flex-col overflow-hidden custom-shadow rounded-lg ${
            sort ? "max-h-[500px]" : "max-h-10"
          }`}
        >
          <div
            onClick={() => setSort((prev) => !prev)}
            className="cursor-pointer bg-white py-2 px-2 flex justify-between items-center"
          >
            <div className="flex items-center gap-x-2">
              <FaSortAmountDown className="text-secondary-500" />
              <h2 className="font-semibold text-secondary-500">Sort</h2>
            </div>
            <span className="text-lg text-secondary-500">
              <HiChevronDown />
            </span>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-x-4">
              <input
                type="radio"
                className="cursor-pointer accent-primary-200 w-4 h-4"
              />
              <p className="text-sm text-secondary-500  font-semibold">
                sort - 1
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Filter;
