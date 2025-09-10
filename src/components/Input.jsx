const Input = ({ type = "text", name, placeholder, register, errors }) => {
  return (
    <div className="flex flex-col gap-y-1 pb-3 w-full">
      <input
        {...register(name)}
        className="w-full border-0 outline-0 p-4 py-2 rounded-lg bg-white custom-shadow placeholder-gray-500 text-secondary-800 text-sm"
        type={type}
        placeholder={placeholder}
        autoComplete="off"
      />
      {errors[name]?.message ? (
        <p className="text-xs text-red-500">{errors[name].message}</p>
      ) : (
        <p className="text-xs text-transparent">|</p>
      )}
    </div>
  );
};

export default Input;
