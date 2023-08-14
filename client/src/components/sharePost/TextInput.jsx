const TextInput = ({ value, onChange, name }) => {
  return (
    <input
      type="text"
      placeholder={`What's on your mind ${name}?`}
      className="border-none outline-none py-3 px-2 bg-transparent w-[100%] text-[#555]"
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;
