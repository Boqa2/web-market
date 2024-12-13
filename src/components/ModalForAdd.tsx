import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import supabase from "./Libs/supabase/subpabase";
import toast from "react-hot-toast";
type add = {
  title: string;
  price: number;
  about: string;
  aboutPlace: string;
  aboutSostav: string;
  size: string;
  card: string;
  gender: string;
};

const ModalForAdd = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fols, setFols] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<add>();
  const home = useNavigate();
  const submit = async (data: add) => {
    setIsLoading(true);
    const uniqueId = Math.floor(Math.random() * 100000);

    const { error } = await supabase.from("myRequest").insert({
      id: uniqueId,
      title: data.title,
      card: data.card,
      price: data.price,
      about: JSON.stringify({
        text: data.about,
        mesto: data.aboutPlace,
        sostav: data.aboutSostav,
      }),
      gender: data.gender,
    });
    if (error) {
      console.error("Ошибка при добавлении в базу данных:", error.message);
      return;
    }
    toast.success("Данные успешно добавлены!");

    setIsLoading(false);
    home("/");
    reset();
  };
  return (
    <div className="w-full px-2 md:px-10">
      <div className="w-full flex justify-end my-2">
        <button onClick={() => home("/")}>
          <i className="bx bx-x"></i>
        </button>
      </div>
      <div className="bg">
        <h1 className="text-3xl text-center font-medium text-gray-500">
          Добавить новый товар
        </h1>
        <div>
          <form action="" onSubmit={handleSubmit(submit)} className="p-5 gap-5">
            <label htmlFor="" className="gap-5 grid md:grid-cols-2 grid-cols-1">
              <div className="col">
                Имя товара
                <input
                  {...register("title", {
                    required: "Это поле не должно быть пустым",
                  })}
                  type="text"
                  className="inpmodal"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="col">
                Фото товара
                <input
                  {...register("card", {
                    required: "Это поле не должно быть пустым",
                  })}
                  type={`${fols ? "file" : "text"}`}
                  className="inpmodal"
                />
                {errors.card && (
                  <p className="text-red-500 text-sm">{errors.card.message}</p>
                )}
                <button className="w-full my-5 rounded-lg text-white font-semibold h-12 ${
                isLoading ? bg-[#ff6163]" type="button" onClick={() => setFols(!fols)}>
                  {fols ? "Файл" : "Сыллка"}
                </button>
              </div>
              <div className="col">
                Стоимость товара
                <input
                  {...register("price", {
                    required: "Это поле не должно быть пустым",
                  })}
                  type="number"
                  min={0}
                  className="inpmodal"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="col">
                Описания к товару
                <input
                  {...register("about", {
                    required: "Это поле не должно быть пустым",
                  })}
                  className="inpmodal"
                  type="text"
                />
                {errors.about && (
                  <p className="text-red-500 text-sm">{errors.about.message}</p>
                )}
              </div>
              <div className="col">
                Место изготовления
                <input
                  {...register("aboutPlace", {
                    required: "Это поле не должно быть пустым",
                  })}
                  className="inpmodal"
                  type="text"
                />
                {errors.aboutPlace && (
                  <p className="text-red-500 text-sm">
                    {errors.aboutPlace.message}
                  </p>
                )}
              </div>
              <div className="col">
                Cостав при изготовления
                <input
                  {...register("aboutSostav", {
                    required: "Это поле не должно быть пустым",
                  })}
                  className="inpmodal"
                  type="text"
                />
                {errors.aboutSostav && (
                  <p className="text-red-500 text-sm">
                    {errors.aboutSostav.message}
                  </p>
                )}
              </div>
              <label className="col" htmlFor="">
                Размер
                <input
                  {...register("size", {
                    required: "Это поле не должно быть пустым",
                  })}
                  className="inpmodal"
                  type="text"
                />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size.message}</p>
                )}
              </label>
              <label htmlFor="" className="col">
                Пол
                <select
                  {...register("gender", {
                    required: "Выберите пол",
                  })}
                  className="inpmodal"
                >
                  <option value="">Веберите пол</option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </label>
            </label>
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full my-5 rounded-lg text-white font-semibold h-12 ${
                isLoading ? "bg-slate-500" : "bg-[#ff6163]"
              } `}
            >
              {isLoading ? (
                <ClipLoader loading={true} size={20} />
              ) : (
                "Разместить товар в ленте"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForAdd;
