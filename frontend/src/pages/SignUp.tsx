import React from "react";
import axios from "axios";
import { useFormStore } from "../stores/useFormStores";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../util/api";
import Title from "../components/Title";

const SignUp: React.FC = () => {
  const {
    formData,
    loading,
    errorMessage,
    successMessage,
    updateFormData,
    setLoading,
    setErrorMessage,
    setSuccessMessage,
    clearErrorMessage,
    clearSuccessMessage,
  } = useFormStore();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof typeof formData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    clearSuccessMessage();

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_BASE_URL + "/api/auth/signup",
        formData
      );
      console.log("Response:", response.data);

      setSuccessMessage("Sign-up successful!");

      setTimeout(() => {
        clearSuccessMessage();
      }, 3000);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("There was an error signing up. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] items-center flex flex-col justify-center px-5 lg:px-0">
       <Title/>
      <div className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1 w-full">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/signupImg.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey, enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-xs flex flex-col gap-4"
              >
                <input
                  className="input input-bordered w-full px-5 py-3 rounded-lg font-medium bg-gray-100 text-sm focus:outline-none"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
                {formData.name === "" && (
                  <p className="text-red-600 text-sm">Name is required</p>
                )}

                <input
                  className="input input-bordered w-full px-5 py-3 rounded-lg font-medium bg-gray-100 text-sm focus:outline-none"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
                {formData.email === "" && (
                  <p className="text-red-600 text-sm">Email is required</p>
                )}
                {formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                  <p className="text-red-600 text-sm">
                    Please enter a valid email address.
                  </p>
                )}

                <input
                  className="input input-bordered w-full px-5 py-3 rounded-lg font-medium bg-gray-100 text-sm focus:outline-none"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                {formData.password === "" && (
                  <p className="text-red-600 text-sm">Password is required</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full mt-5 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="/login">
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <div>
              <span>{successMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
