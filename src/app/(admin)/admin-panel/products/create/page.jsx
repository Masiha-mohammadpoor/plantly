"use client";
import { useState } from "react";
import { useGetAllCategories } from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

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
      <ProductForm
        onSubmit={submitHandler}
        onChange={changeHandler}
        categories={categories}
        categoriesLoading={categoriesLoading}
        category={category}
        setCategory={setCategory}
        formData={formData}
        btnText="Add Product"
      />
    </section>
  );
};

export default CreateProduct;
