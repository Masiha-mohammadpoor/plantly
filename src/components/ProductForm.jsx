"use client";
import { productFormInputsData } from "@/constants/productsFieldData";
import FormInput from "./FormInput";
import Select from "react-select";
import { selectStyles } from "@/constants/selectStyles";

const ProductForm = ({
  onSubmit,
  formData,
  onChange,
  categories,
  categoriesLoading,
  category,
  setCategory,
  btnText,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="w-full md:w-[50%]">
        {productFormInputsData.map((f) => {
          return (
            <FormInput
              key={f.id}
              id={f.name}
              label={f.label}
              name={f.name}
              type={f.type}
              value={formData[f.name]}
              onChange={onChange}
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
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
