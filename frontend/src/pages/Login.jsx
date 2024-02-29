import React, { useState } from "react";
import axios from "axios";
import { authState } from "../recoil";
import { useRecoilState } from "recoil";
import toast from 'react-hot-toast';

const Login = () => {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  const [auth, setAuth] = useRecoilState(authState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.email === "" || formInput.password === "") {
      toast.error("Please fill all fields");
      return;
    }

    const loginUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
          formInput
        );

        localStorage.setItem("token", response.data.token);
        setAuth({ token: response.data.token });

        toast.success("Logged in successfully");
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };

    loginUser();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]"
	>
	  <h1 className="text-3xl font-medium mb-8">Login to Continue</h1>

      <form className="flex flex-col items-center gap-4 w-1/5 mx-auto"
	  onSubmit={handleSubmit}>
        <input className="border border-gray-400 rounded-md p-2 w-full"
          type="email"
          placeholder="Email"
          value={formInput.email}
          onChange={(e) =>
            setFormInput({ ...formInput, email: e.target.value })
          }
        />
        <input className="border border-gray-400 rounded-md p-2 w-full"
          type="password"
          placeholder="Password"
          value={formInput.password}
          onChange={(e) =>
            setFormInput({ ...formInput, password: e.target.value })
          }
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
		 type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
