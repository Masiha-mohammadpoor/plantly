"use client";
import { useEffect, useState } from "react";
import { useGetAllCategories } from "@/hooks/useCategories";
import { useGetProduct, useUpdateProduct } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const { mutateAsync } = useUpdateProduct();
  const { product, productLoading } = useGetProduct(params.productId);
  const { data } = product || {};
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

  useEffect(() => {
    if (!productLoading && product) {
      setFormData({
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        offPrice: data.offPrice,
        images: data.images,
        stock: data.stock,
      });
      setCategory({ _id: data.category._id, name: data.category.name });
    }
  }, [product]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        price: parseInt(formData.price),
        offPrice: parseInt(formData.offPrice),
        stock: parseInt(formData.stock),
        category,
      };
      await mutateAsync({ id: params.productId, data: updatedData });
      toast.success("Product updated successfully !!!");
      router.push("/admin-panel/products");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="w-full bg-white rounded-tl-lg h-screen pb-28 px-8 pt-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Edit Product</h2>
      <ProductForm
        onSubmit={submitHandler}
        onChange={changeHandler}
        categories={categories}
        categoriesLoading={categoriesLoading}
        category={category}
        setCategory={setCategory}
        formData={formData}
        btnText="Update Product"
      />
    </section>
  );
};

export default EditProduct;
