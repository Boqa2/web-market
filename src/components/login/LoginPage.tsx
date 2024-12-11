import { useForm } from "react-hook-form";
import { integer } from "../Libs/type/types";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import supabase from "../Libs/supabase/subpabase";
import {  login } from "../../app/rtqStore";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const LoginPage = () => {
  const [inVise, setInVise] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<integer>();
  const home = useNavigate();

  const signUp = async (data: integer) => {
    setIsLoading(true);
    const response = await supabase
      .from("users")
      .select("*")
      .eq("email", data.email)
      .eq("password", data.password);

    if (response.data && response.data.length > 0) {
      const user = response.data[0];
      dispatch(login({ user }));
      localStorage.setItem("user", JSON.stringify(user)); // Сохраняем пользователя
      home("/");
      toast.success("You enter your account");
    } else {
      console.error("Invalid login credentials");
      toast.error("Invalid login credentials");
    }
    reset();
    setIsLoading(false);
  };

  return (
    <div className="px-10 mx-auto container flex flex-col  w-full">
      <h1 className="my-5 text-2xl font-semibold text-gray-700 text-center">Вход</h1>
      <div>
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit(signUp)} className="flex gap-0 flex-col md:w-1/3 w-full">
            <label htmlFor="" className="flex flex-col gap-1">
              <div className="text-xl">
                Email<span className="text-red-500"> *</span>
              </div>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="h-12 outline-none px-3 border border-black rounded-lg"
              />
              <p className="text-red-500 -mt-1 font-medium">
                {errors.email?.message}
              </p>
            </label>
            <label htmlFor="" className="flex flex-col relative gap-1">
              <div className="text-xl">
                Password<span className="text-red-500"> *</span>
              </div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be exceed 8 characters",
                  },
                })}
                type={`${inVise ? "text" : "password"}`}
                placeholder="Password"
                className="h-12 outline-none px-3 border border-black rounded-lg"
              />
              <p className="text-red-500 -mt-1 font-medium">
                {errors.password?.message}
              </p>
              <div className="absolute -inset-y-1 right-0 flex items-center pr-3">
                {" "}
                <button
                  type="button"
                  onClick={(e: FormEvent<HTMLButtonElement>) => {
                    setInVise(!inVise);
                    e.preventDefault();
                  }}
                  className="text-slate-400 text-2xl"
                >
                  {" "}
                  <i className={`bx bx-${inVise ? "show" : "hide"}`}></i>{" "}
                </button>{" "}
              </div>
            </label>
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full rounded-lg text-white font-semibold h-12 ${
                isLoading ? "bg-slate-500" : "bg-[#ff6163]"
              } `}
            >
              {isLoading ? <ClipLoader loading={true} size={20} /> : "Войти"}
            </button>
          </form>
        </div>
        <div className="mt-1 text-center">
          <Link
            className="hover:border-b text-slate-700 text-center border-black"
            to="/register"
          >
            Если вы не зарегистрированы, перейдите по ссылке
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
