import React from "react";
import { useFormStore } from "../stores/useFormStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../util/api";
import Title from "../components/Title";

const Login: React.FC = () => {
  const {
    formData,
    errorMessage,
    successMessage,
    updateFormData,
    setLoading,
    setSuccessMessage,
    setErrorMessage,
    clearSuccessMessage,
  } = useFormStore();
  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof typeof formData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_BASE_URL + "/api/auth/login",
        formData
      );
      console.log("Response:", response.data);
      if (response.status === 200 && response.data.token) {
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          clearSuccessMessage();
        }, 3000);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setErrorMessage("There was an error. Please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("There was an error. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] items-center flex-col flex justify-center px-5 lg:px-0">
      
      <Title/>
      <div className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1 w-full">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/loginImg.jpg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Welcome!
              </h1>
              <p className="text-[12px] text-gray-500">
                Please enter your details to login.
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-xs flex flex-col gap-4"
              >
                <input
                  className="input input-bordered w-full px-5 py-3 rounded-lg font-medium bg-gray-100 text-sm focus:outline-none"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
                {formData.email?.trim() === "" && (
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
                {formData.password?.trim() === "" && (
                  <p className="text-red-600 text-sm">Password is required</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full mt-5 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                >
                  {" "}
                  Log In
                </button>

                <div className="mt-4 flex items-center w-full text-center">
                  <a
                    href="/signup"
                    className="text-xs text-gray-500 capitalize text-center w-full"
                  >
                    Don&apos;t have any account yet?
                    <span className="text-blue-700"> Sign Up</span>
                  </a>
                </div>
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

export default Login;
