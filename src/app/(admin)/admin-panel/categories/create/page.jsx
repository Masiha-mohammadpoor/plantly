"use client";
import { useState } from "react";
import { useCreateCategory } from "@/hooks/useCategories";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/CategoryForm";

const CreateCatgory = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateCategory();
  const [formData, setFormData] = useState({
    name: "",
    englishTitle: "",
    description: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync(formData);
      toast.success("Category created successfully !!!");
      router.push("/admin-panel/categories");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Create Category</h2>
      <CategoryForm
        onSubmit={submitHandler}
        onChange={changeHandler}
        formData={formData}
        btnText="Add Category"
      />
    </section>
  );
};

export default CreateCatgory;
