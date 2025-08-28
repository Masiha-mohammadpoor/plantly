const Input = ({label , id , type = "text" , name , value , onChange}) => {
  return (
    <div className="flex flex-col justify-start gap-y-1 mb-4">
      <label htmlFor={id} className="text-secondary-800">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        autoComplete="off"
        onChange={onChange}
        value={value}
        className="bg-secondary-200 outline-none custom-shadow p-2 rounded-lg text-secondary-800"
      />
    </div>
  );
};

export default Input;
