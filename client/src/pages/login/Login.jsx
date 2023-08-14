import ImageSection from "./ImageSection";
import LoginForm from "./LoginForm";
import useLogin from "./useLogin";

const Login = () => {
  const { handleChange, handleLogin, err } = useLogin();

  return (
    <div className="h-screen bg-purple-300 flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-[80%] min-h-[500px] bg-white rounded-2xl overflow-hidden">
        <ImageSection />
        <LoginForm handleChange={handleChange} handleLogin={handleLogin} err={err} />
      </div>
    </div>
  );
};

export default Login;
