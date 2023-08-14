import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const useRegister = (navigate) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs
      );

      if (response.status === 200) {
        await login({ email: inputs.email, password: inputs.password });
        navigate("/");
        console.log("inside");
      }
    } catch (err) {
      setErr(err.response);
    }
  };

  return { err, handleChange, handleRegister };
};

export default useRegister;
