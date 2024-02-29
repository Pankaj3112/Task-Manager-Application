import axios from "axios";
import React, { useState } from "react";
import toast from 'react-hot-toast';

const Signup = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = (e) => {
	e.preventDefault();

	if (formInput.name === "" || formInput.email === "" || formInput.password === "" || formInput.confirmPassword === "") {
	  toast.error("Please fill all fields");
	  return;
	}

	if (formInput.password !== formInput.confirmPassword) {
	  toast.error("Passwords do not match");
	  return;
	}

	const signupUser = async () => {
	  try {
		const response = await axios.post(
		  `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
		  formInput
		);

		toast.success("Signup successful");
	  } catch (err) {
		toast.error(err.response.data.message);
	  }
	};

	signupUser();
  }

  return (
	<div className="flex flex-col items-center justify-center h-[80vh]"
	>
	  <h1 className="text-3xl font-medium mb-8"
	  >Signup to Continue</h1>
	  <form className="flex flex-col items-center gap-4 w-1/5 mx-auto"
	  onSubmit={handleSignUp}>
		<input className="border border-gray-400 rounded-md p-2 w-full"
		  type="text"
		  placeholder="Name"
		  value={formInput.name}
		  onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
		/>
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
		<input className="border border-gray-400 rounded-md p-2 w-full"
		  type="password"
		  placeholder="Confirm Password"
		  value={formInput.confirmPassword}
		  onChange={(e) =>
			setFormInput({ ...formInput, confirmPassword: e.target.value })
		  }
		/>
		<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
		 type="submit">Signup</button>
	  </form>
	</div>
  );
};

export default Signup;
