"use client";
import { Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationComponent = (count) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const paginationHandler = (page) => {
    current.set("page", page);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, {
      scroll: false,
    });
  };
  return (
    <div className="flex justify-center items-center col-span-12 md:col-span-9 mb-5 md:col-start-4">
      <Pagination
        count={count.count}
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
