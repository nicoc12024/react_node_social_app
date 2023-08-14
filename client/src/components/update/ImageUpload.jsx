import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUpload = ({ label, file, setFile, currentUser, type }) => {
  return (
    <label htmlFor={type} className="flex flex-col gap-2 text-gray-900 text-[14px]">
      <span>{label}</span>
      <div className="imgContainer relative">
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : `/upload/${currentUser.id}/${currentUser[type]}`
          }
          alt=""
          className="w-[85px] h-[85px] object-cover rounded-md"
        />
        <div className="absolute right-0 left-0 bottom-0 top-0 bg-black opacity-25 rounded-md"></div>
        <CloudUploadIcon className="icon absolute top-0 bottom-0 left-0 right-0 m-auto text-[30px] text-white cursor-pointer" />
      </div>
      <input
        type="file"
        id={type}
        name={type}
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden p-2 border border-b-[1px] border-gray-800 bg-transparent"
      />
    </label>
  );
};

export default ImageUpload;
