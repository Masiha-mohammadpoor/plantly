"use client";
import { categoryFormInputsData } from "@/constants/categoriesFieldData";
import FormInput from "./FormInput";

const CategoryForm = ({ onSubmit, formData, onChange, btnText }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className="w-full md:w-[50%]">
        {categoryFormInputsData.map((f) => {
          return (
            <FormInput
              key={f.id}
              id={f.name}
              label={f.label}
              name={f.name}
              type={f.type}
              value={formData[f.name]}
              onChange={onChange}
              optional={f.optional}
            />
          );
        })}
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

export default CategoryForm;
