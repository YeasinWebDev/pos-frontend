import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignInMutation } from "../../features/auth/authApi";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const SignIn = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data : any) => {
    try {
      signIn(data);
    } catch (error) {
      console.error("Sign In failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F2E3]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-xl rounded-xl px-5 md:px-10 py-12"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer bg-green-500 text-white font-semibold py-3 rounded-xl transition-all hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account? <Link to="/signup" className="text-green-600 underline cursor-pointer font-semibold">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
