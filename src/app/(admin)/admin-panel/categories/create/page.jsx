"use client";
import { categoryFormInputsData } from "@/constants/categoriesFieldData";
import Input from "../../Input";
import { useState } from "react";
import { useCreateCategory } from "@/hooks/useCategories";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateCatgory;
