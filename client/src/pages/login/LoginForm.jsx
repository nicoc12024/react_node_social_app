const LoginForm = ({ handleChange, handleLogin, err }) => {
  return (
    <div className="flex-1 p-8 w-full flex flex-col gap-6 justify-center">
      <h1 className="text-3xl text-gray-700">Login</h1>
      <form className="flex flex-col gap-6">
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
        {err && <span className="text-red-500 text-sm">{err}</span>}
        <button
          onClick={handleLogin}
          className="max-w-[150px] py-1 px-2 bg-purple-600 text-white font-bold cursor-pointer text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
