import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignUpMutation } from "../../features/auth/authApi";
import { uploadImageToCloudinary } from "../../utils/uploadImage";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  // role: yup
  //   .string()
  //   .oneOf(["Admin", "Waiter", "Cashier", "Kitchen"])
  //   .required(),
  image: yup.string().required("Image is required"),
});

const SignUp = () => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 👈 for image preview
  const [signUp] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setValue("image", imageUrl);
      setPreviewUrl(imageUrl);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log("click")
    try {
      setUploading(true);
      await signUp(data);
      setUploading(false);
    } catch (error) {
      console.error("Sign Up failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F2E3]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto bg-white shadow-xl p-10 rounded-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h2>

        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role Select */}
        {/* <div>
          <select
            {...register("role")}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Cashier">Cashier</option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div> */}

        {/* File Upload */}
        <div>
          <div className="w-full">
            <label
              htmlFor="image-upload"
              className="block w-full cursor-pointer border-2 border-dashed border-green-500 rounded-md p-5 text-center text-gray-600 hover:bg-green-50 transition"
            >
              <span className="text-sm">Click to upload an image</span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
            {errors.image && (
              <p className="text-sm text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* 👇 Preview Image */}
          {previewUrl && (
            <div className="mt-4">
              <p className="text-[16px] text-gray-700 mb-2 font-medium">
                Preview:
              </p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full bg-green-500 text-white font-semibold py-3 rounded-lg transition-all ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 cursor-pointer"
          }`}
        >
          {uploading ? "Uploading..." : "Sign Up"}
        </button>
        <p className="text-sm text-gray-500 text-center mt-2">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-green-600 underline cursor-pointer font-semibold"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
}

export default SignUp;
