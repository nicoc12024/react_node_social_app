import { Link } from "react-router-dom";

const ImageSection = () => {
  return (
    <div className="flex-1 relative bg-violet-900 p-8 flex flex-col  justify-center gap-6 text-white opacity-95">
      <img
        src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="people together"
        className="w-[100%] h-full object-cover mix-blend-overlay z-[-10] absolute top-0 left-0 right-0 bottom-0"
      />
      <div className="flex flex-col justify-center gap-y-8">
        <h1 className="text-6xl font-bold break-all">Hello.</h1>
        <p className="text-sm max-w-[400px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum, alias totam
          numquam ipsa.
        </p>
        <span className="text-sm">Don't you have an account?</span>
        <Link
          to="/register"
          className="cursor-pointer max-w-[150px] py-1 px-2 border font-bold text-lg text-center border-white hover:bg-white hover:text-violet-900 transition-all"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default ImageSection;
