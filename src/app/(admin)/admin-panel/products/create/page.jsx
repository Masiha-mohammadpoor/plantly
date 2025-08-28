"use client";
import { productFormInputsData } from "@/constants/productsFieldData";
import Input from "../../Input";
import { useState } from "react";
import { useGetAllCategories } from "@/hooks/useCategories";
import Select from "react-select";
import { selectStyles } from "@/constants/selectStyles";
import { useCreateProduct } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateProduct = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateProduct();
  const { categories, categoriesLoading } = useGetAllCategories();
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    offPrice: "",
    images: "",
    stock: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({
        ...formData,
        price: parseInt(formData.price),
        offPrice: parseInt(formData.offPrice),
        stock: parseInt(formData.stock),
        category,
      });
      toast.success("Product created successfully !!!");
      router.push("/admin-panel/products");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Create Product</h2>
      <div>
        <form onSubmit={submitHandler} className="w-[50%]">
          {productFormInputsData.map((f) => {
            return (
              <Input
                key={f.id}
                id={f.name}
                label={f.label}
                name={f.name}
                type={f.type}
                value={formData[f.name]}
                onChange={changeHandler}
              />
            );
          })}
          {categories && !categoriesLoading && (
            <div className="flex flex-col justify-start gap-y-1 mb-4">
              <label className="text-secondary-800">Category</label>
              <Select
                defaultValue={category}
                value={category}
                onChange={setCategory}
                options={categories?.data}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                menuPlacement="auto"
                placeholder="select..."
                styles={selectStyles}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full text-white rounded-lg bg-primary-200 py-2 cursor-pointer mt-4"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
