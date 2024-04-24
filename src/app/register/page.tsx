"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { User } from "../interfaces";
import api from "../components/Axios";

interface FormData {
  first_name: string;
  email: string;
  organization_name: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted, isValid },
  } = useForm<FormData>();

  const [regsiterResponse, setRegisterResponse] = useState<string>(" ");
  const [regsiterState, setRegisterState] = useState<User | undefined>(
    undefined
  );
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("dataforregister", data);
    let urlforregister = `http://172.174.112.166:8000/api/user/register/`;
    try {
      const response = await api.post(urlforregister, data);
      console.log("response in register", response.data);
      const { accessToken, refreshToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      setRegisterResponse(response.data.message);
      router.push("/");
      setRegisterState(response.data.user);
    } catch (error) {
      setRegisterResponse(error?.response?.data?.message?.email[0]);
      console.error("error in registration", error);
    }
  };

  useEffect(() => {
    if (regsiterState) {
      localStorage.setItem("userInfo", JSON.stringify(regsiterState));
    }
  }, [regsiterState]);

  return (
    <div className=" flex justify-evenly items-center bg-gradient-to-b from-yellow-100 to-yellow-400">
      <div className="w-7/12 h-screen flex items-center justify-center">
        <div>
          <Image
            src="/tyn-login.png"
            alt="tyn-login"
            width={440}
            height={10}
            className=""
          />
        </div>
      </div>
      <div className="w-5/12  bg-white order-2 md:order-2 h-screen">
        <div className="flex items-start justify-start flex-col gap-y-2 xl:gap-4 p-8">
          <h2 className="font-bold text-3xl xl:text-5xl">Get started</h2>
          <p className="font-light text-base xl:text-xl text-gray-400">
            Start your journey by creating an account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 xl:gap-8 px-10 justify-center items-center  xl:pt-8"
        >
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="first_name">Full Name</label>
            <input
              type="text"
              {...register("first_name", { required: "Name is required" })}
              id="first_name"
              autoComplete="given-name"
              placeholder="Enter your Name"
              className="text-base placeholder-text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder-text-gray-300 border border-solid w-80"
            />
            {errors.first_name && isSubmitted && (
              <p className="text-red-500 capitalize">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="email">Organisation Email</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className="text-base placeholder-text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder-text-gray-300 border border-solid w-80"
            />
            {errors.email && isSubmitted && (
              <p className="text-red-500 capitalize">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              autoComplete="off"
              id="password"
              placeholder="Enter your password"
              className="text-base placeholder:text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder:text-gray-300 border border-solid w-80"
            />
            {errors.password && (
              <p className="text-red-500 capitalize">
                {errors.password.message as React.ReactNode}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="organization">Organization Name</label>
            <input
              type="text"
              {...register("organization_name", {
                required: "Organization name is required",
              })}
              autoComplete="off"
              id="organization"
              placeholder="Enter your organization"
              className="text-base placeholder-text-base px-5 py-3 h-10 outline-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] placeholder-text-gray-300 border border-solid w-80"
            />
            {errors.organization_name && isSubmitted && (
              <p className="text-red-500 capitalize">
                {errors.organization_name.message}
              </p>
            )}
          </div>

          {isSubmitted && regsiterResponse && (
            <p className="text-blue-500 capitalize">{regsiterResponse}</p>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className="rounded-md bg-blue-500 text-sm px-4 py-2 text-white flex items-center justify-center uppercase font-semibold"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-10">
          <div>Already have an account?</div>
          <Link href="/login" className="underline">
            Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
