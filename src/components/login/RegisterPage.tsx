import { useForm } from "react-hook-form";
import { integer } from "../Libs/type/types";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../app/rtqStore";
import toast from "react-hot-toast";
import supabase from "../Libs/supabase/subpabase";
import { ClipLoader } from "react-spinners";

const RegisterPage = () => {
  const [inVise, setInVise] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<integer>();
  const dispatch = useDispatch();
  const home = useNavigate();

  const signUp = async (data: integer) => {
    setIsLoading(true);
    try {
      // Сохраняем пользователя в базе данных
      const { data: newUsers } = await supabase.from("users").insert({
        email: data.email,
        password: data.password, // Рекомендуется использовать хэш вместо открытого текста
        name: data.name,
      });
      console.log(newUsers);
      
      const response = await supabase
        .from("users")
        .select("*")
        .eq("email", data.email)
        .eq("password", data.password);

      if (response.error) {
        // Обработка ошибки
        console.error(
          "Ошибка при создании пользователя:",
          response.error.message
        );
        toast.error(
          "Ошибка при создании пользователя: " + response.error.message
        );
      } else if (response.data && response.data.length > 0) {
        const user = response.data[0];

        // Сохраняем пользователя в Redux
        dispatch(login({ user }));

        // Сохраняем пользователя в localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        // Перенаправляем на HomePage
        home("/");

        // Уведомляем об успехе
        toast.success("Вы успешно зарегстрировались!");
        reset(); // Сбрасываем форму только при успехе
      }
    } catch (error) {
      // Неизвестные ошибки
      console.error("Неизвестная ошибка:", error);
      toast.error("Что-то пошло не так. Попробуйте позже.");
    } finally {
      setIsLoading(false); // Останавливаем загрузку
    }
  };

  return (
    <div className="px-10 mx-auto container flex flex-col  w-full">
      <h1 className="my-5 text-2xl font-semibold text-gray-700 text-center">
        Регистрация
      </h1>
      <div className="">
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(signUp)}
            className="flex md:w-1/3 w-full gap-1 flex-col"
          >
            <label htmlFor="" className="flex flex-col gap-1">
              <div className="text-xl">
                Name<span className="text-red-500"> *</span>
              </div>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Name"
                className="h-12 outline-none px-3 border w-full border-black rounded-lg"
              />
              <p className="text-red-500 -mt-1 font-medium">
                {errors.name?.message}
              </p>
            </label>
            <label htmlFor="" className="flex flex-col gap-1">
              <div className="text-xl">
                Email<span className="text-red-500"> *</span>
              </div>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="h-12 outline-none px-3 border w-full border-black rounded-lg"
              />
              <p className="text-red-500 font-medium -m-1">
                {errors.email?.message}
              </p>
            </label>
            <label htmlFor="" className="flex flex-col w-full relative gap-1">
              <div className="text-xl">
                Password<span className="text-red-500"> *</span>
              </div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password cannot exceed 8 characters",
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
              className={`w-full rounded-lg text-white font-semibold h-12 ${
                isLoading ? "bg-slate-500" : "bg-[#ff6163]"
              }`}
            >
              {isLoading ? (
                <ClipLoader loading={true} size={20} />
              ) : (
                "Регистрация"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="text-center">
        <Link
          className="hover:border-b text-slate-700 border-black"
          to={"/login"}
        >
          Если у вы не зарегистрырованы перейдите по сылке
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
