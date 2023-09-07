import Image from "../../assets/img.png";

const ImageUploader = ({ setFile }) => {
  return (
    <div className="flex items-center gap-5">
      <input
        type="file"
        id="file"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <label htmlFor="file">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={Image} alt="" className="h-[20px]" />
          <span className="text-[12px] text-gray-500">Add Image</span>
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;
