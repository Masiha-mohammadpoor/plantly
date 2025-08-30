"use client";
import { useEffect, useState } from "react";
import { useGetCategory, useUpdateCategory } from "@/hooks/useCategories";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import CategoryForm from "@/components/CategoryForm";

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
      <CategoryForm
        onSubmit={submitHandler}
        onChange={changeHandler}
        formData={formData}
        btnText="Update Category"
      />
    </section>
  );
};

export default EditCategory;
