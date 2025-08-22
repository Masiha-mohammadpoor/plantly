"use client";
import { useCallback, useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaSortAmountDown } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { IoPricetagOutline } from "react-icons/io5";
import { useGetAllCategories } from "@/hooks/useCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterTypes = [
  { id: 1, title: "All", value: "all" },
  { id: 2, title: "By Discount", value: "by-discount" },
  { id: 3, title: "Popular", value: "popular" },
];

const filterSorts = [
  { id: 1, title: "High To Low", value: "HTL" },
  { id: 2, title: "Low To High", value: "LTH" },
];

const Filter = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const { categories, categoriesLoading } = useGetAllCategories();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryQuery = searchParams.get("category");
  const typeQuery = searchParams.get("type");
  const sortQuery = searchParams.get("sort");

  const [selectedCategories, setSelectedCategories] = useState(
    categoryQuery ? categoryQuery.split(",") : []
  );
  const [selectedType, setSelectedType] = useState(typeQuery || "");
  const [selectedSort, setSelectedSort] = useState(sortQuery || "");

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    const typeQuery = searchParams.get("type");
    const sortQuery = searchParams.get("sort");

    setSelectedCategories(categoryQuery ? categoryQuery.split(",") : []);
    setSelectedType(typeQuery || "");
    setSelectedSort(sortQuery || "");
  }, [searchParams]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);

      if (value === "" || value.length === 0) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const categoryHandler = (e) => {
    const value = e.target.value;

    if (value === "all") {
      setSelectedCategories([]);
      router.push(pathname + "?" + createQueryString("category", ""));
    } else {
      if (e.target.checked) {
        const newCategories = [...selectedCategories, value];
        setSelectedCategories(newCategories);
        router.push(
          pathname +
            "?" +
            createQueryString("category", newCategories.join(","))
        );
      } else {
        const filteredArray = selectedCategories.filter(
          (category) => category !== value
        );
        setSelectedCategories(filteredArray);
        router.push(
          pathname +
            "?" +
            createQueryString(
              "category",
              filteredArray.length > 0 ? filteredArray.join(",") : ""
            )
        );
      }
    }
  };

  const typeHandler = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    router.push(pathname + "?" + createQueryString("type", value));
  };

  const sortHandler = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  return (
    <article className="col-span-3 pb-20 h-96 overflow-y-scroll">
      <h2 className="text-secondary-500 text-lg font-semibold sticky top-0 bg-bg p-3 ">
        Filter & Sort
      </h2>
      {!categoriesLoading && categories && (
        <div className="flex flex-col gap-y-4">
          {/* category */}
          <div
            className={`transition-all duration-500 bg-white flex flex-col overflow-hidden custom-shadow rounded-lg ${
              categoryOpen ? "max-h-[500px]" : "max-h-10"
            }`}
          >
            <div
              onClick={() => setCategoryOpen((prev) => !prev)}
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
              <div className="flex items-center gap-x-4 py-2">
                <input
                  type="checkbox"
                  className="cursor-pointer accent-primary-200 w-4 h-4"
                  value="all"
                  onChange={categoryHandler}
                  checked={selectedCategories.length === 0}
                />
                <p className="text-sm text-secondary-500 font-semibold">All</p>
              </div>
              {categories.data.map((c) => {
                return (
                  <div key={c._id} className="flex items-center gap-x-4 py-2">
                    <input
                      value={c.englishTitle}
                      type="checkbox"
                      className="cursor-pointer accent-primary-200 w-4 h-4"
                      onChange={categoryHandler}
                      checked={selectedCategories.includes(c.englishTitle)}
                    />
                    <p className="text-sm text-secondary-500 font-semibold">
                      {c.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* type */}
          <div
            className={`transition-all duration-500 bg-white flex flex-col overflow-hidden custom-shadow rounded-lg ${
              typeOpen ? "max-h-[500px]" : "max-h-10"
            }`}
          >
            <div
              onClick={() => setTypeOpen((prev) => !prev)}
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
              {filterTypes.map((t) => {
                return (
                  <div key={t.id} className="flex items-center gap-x-4 py-2">
                    <input
                      value={t.value}
                      type="radio"
                      name="type"
                      className="cursor-pointer accent-primary-200 w-4 h-4"
                      onChange={typeHandler}
                      checked={selectedType === t.value}
                    />
                    <p className="text-sm text-secondary-500  font-semibold">
                      {t.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* sort */}
          <div
            className={`transition-all duration-500 bg-white flex flex-col overflow-hidden custom-shadow rounded-lg ${
              sortOpen ? "max-h-[500px]" : "max-h-10"
            }`}
          >
            <div
              onClick={() => setSortOpen((prev) => !prev)}
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
              {filterSorts.map((s) => {
                return (
                  <div key={s.id} className="flex items-center gap-x-4 py-2">
                    <input
                      value={s.value}
                      type="radio"
                      name="sort"
                      className="cursor-pointer accent-primary-200 w-4 h-4"
                      onChange={sortHandler}
                      checked={selectedSort === s.value}
                    />
                    <p className="text-sm text-secondary-500  font-semibold">
                      {s.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default Filter;
