const TextInput = ({ label, value, name, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="flex flex-col gap-2 text-gray-900 text-[14px]">
        {label}
      </label>
      <input
        className="p-2 border border-b-[1px] border-gray-400 text-gray-900 bg-transparent w-full rounded-md"
        type="text"
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        maxLength={25}
      />
    </div>
  );
};

export default TextInput;
