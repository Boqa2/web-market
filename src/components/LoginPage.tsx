import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import Logo from "./Libs/urls";
import { useState } from "react";

type FormValues = {
  email: string;
};

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a six-digit code
  };

  const submit: SubmitHandler<FormValues> = async (data) => {
    const code = generateCode();
    
    try {
      await axios.post(`${Logo.urlTask}/users`, { email: data.email });
      await axios.post("http://localhost:5000/users", { email: data.email, code });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-10 w-1/2">
      <h1 className="my-5 text-2xl font-semibold text-gray-700">
        Вход в кабинет покупателя
      </h1>
      <div>
        <div>
          <form
            action=""
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-5"
          >
            <label htmlFor="" className="flex flex-col gap-3">
              <div className="text-xl">
                Email<span className="text-red-500"> *</span>
              </div>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="h-12 outline-none px-3 border border-black rounded-lg"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </label>
            <button className="w-full rounded-lg text-white font-semibold h-12 bg-[#ff6163]">
              Получить код
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
