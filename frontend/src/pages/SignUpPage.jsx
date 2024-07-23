/* eslint-disable no-undef */
import { useState } from "react";
import { FaUnlockAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        // `${process.env.REACT_APP_API}/user/register/`,
        "http://192.168.155.213:8000/user/register/",
        userData
      );

      if (response.status === 201) {
        toast.success("User Registered. Please Login to Continue...");
        return response.data;
      } else {
        toast.error("Failed to register user. Please try again!");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      toast.error("Something went wrong. Please try again");
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Invalid email address");
      return;
    }

    // if (formData.password.length < 8) {
    //   setError("Password must be at least 8 characters long");
    //   return;
    // }

    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      // window.location.href = "/login";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    //		<div className="flex items-center justify-center min-h-screen bg-gray-900">
    //		<div className="max-w-md w-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20
    //hover:bg-opacity-30 border border-gray-700 text-white shadow-lg rounded-lg p-6 sm:p-8">
    <>
      <video src="../../public/bg.mp4" autoPlay loop muted playsInline></video>
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 hover:bg-gray-600/10 border border-gray-800 text-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="ID"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
              required
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
              required
            />
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
              required
            >
              <option
                value=""
                className="text-gray-400"
                style={{ fontWeight: "lighter" }}
                //   disabled
              >
                Select your Branch
              </option>
              <option value="PUC1">PUC1</option>
              <option value="PUC2">PUC2</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MME">MME</option>
              <option value="CIVIL">CIVIL</option>
              <option value="CHE">CHE</option>
              <option value="MECH">MECH</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
              required
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={formData.confirm}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 text-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-gray-300 mt-4 text-center">
            By signing up, you will unlock all the features of the app.{" "}
            <FaUnlockAlt className="inline" />
          </p>

          <p className="text-gray-300 mt-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
