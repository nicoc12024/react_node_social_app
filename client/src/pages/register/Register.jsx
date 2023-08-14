import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useRegister from "./useRegister";

export default function Register() {
  const navigate = useNavigate();
  const { err, handleChange, handleRegister } = useRegister(navigate);

  return (
    <div className="h-screen bg-purple-300 flex p-8 items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-[400px] w-full bg-white rounded-2xl overflow-hidden">
        <div className="p-8 w-full flex flex-col gap-6 justify-center">
          <Link
            to="/login"
            className="text-gray-900 flex items-center gap-x-2 hover:text-gray-500"
          >
            <BiArrowBack className="text-lg" />
            <span className="text-sm">Go back</span>
          </Link>
          <h1 className="text-3xl text-gray-700 font-bold">Register</h1>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Name"
              className="border-b border-gray-300 p-2 text-sm"
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="border-b border-gray-300 p-2 text-sm"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b border-gray-300 p-2 text-sm"
              name="password"
              onChange={handleChange}
            />

            {err && <span className="text-red-500 text-sm">Something went wrong!</span>}
            <button
              onClick={handleRegister}
              className="w-[50%] py-1 px-2 bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer text-lg"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
