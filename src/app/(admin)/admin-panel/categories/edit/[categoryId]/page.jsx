"use client";
import { categoryFormInputsData } from "@/constants/categoriesFieldData";
import Input from "../../../Input";
import { useEffect, useState } from "react";
import { useGetCategory, useUpdateCategory } from "@/hooks/useCategories";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const EditCategory = () => {
  const router = useRouter();
  const params = useParams();
  const { category, categoryLoading } = useGetCategory(params.categoryId);
  const { data } = category || {};
  const { mutateAsync } = useUpdateCategory();
  const [formData, setFormData] = useState({
    name: "",
    englishTitle: "",
    description: "",
  });

  useEffect(() => {
    if (!categoryLoading && category) {
      setFormData({
        name: data.name,
        englishTitle: data.englishTitle,
        description: data.description,
      });
    }
  }, [category]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync({ id: params.categoryId, data: formData });
      toast.success("Category updated successfully !!!");
      router.push("/admin-panel/categories");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Edit Category</h2>
      <div>
        <form onSubmit={submitHandler} className="w-[50%]">
          {categoryFormInputsData.map((f) => {
            return (
              <Input
                key={f.id}
                id={f.name}
                label={f.label}
                name={f.name}
                type={f.type}
                value={formData[f.name]}
                onChange={changeHandler}
                optional={f.optional}
              />
            );
          })}
          <button
            type="submit"
            className="w-full text-white rounded-lg bg-primary-200 py-2 cursor-pointer mt-4"
          >
            Update Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
