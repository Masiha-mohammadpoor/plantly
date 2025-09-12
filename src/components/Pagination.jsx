"use client";
import { Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaginationComponent = (count) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setPage(parseInt(pageParam, 10));
    } else {
      setPage(1);
    }
  }, [searchParams]);

  const paginationHandler = (newPage) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", newPage.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, {
      scroll: false,
    });
    setPage(newPage);
  };

  return (
    <div className="flex justify-center items-center col-span-12 md:col-span-9 mb-5 md:col-start-4">
      <Pagination
        count={count.count}
        page={page}
        onChange={(e, value) => paginationHandler(value)}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#588157",
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#588157",
            color: "white",
            "&:hover": {
              backgroundColor: "#476b4a",
            },
          },
          "& .MuiPaginationItem-page:hover": {
            backgroundColor: "#e8f5e8",
          },
        }}
      />
    </div>
  );
};

export default PaginationComponent;
