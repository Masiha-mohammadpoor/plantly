const Input = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-y-1 pb-3">
      <input
        className="border-0 outline-0 w-80 p-2 py-1.5 rounded-lg bg-white custom-shadow placeholder-gray-500 text-secondary-800 text-sm"
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
      />
      <p className="text-xs text-red-500">error</p>
    </div>
  );
};

export default Input;
