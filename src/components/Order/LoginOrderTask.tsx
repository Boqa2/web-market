import { useForm } from "react-hook-form";
import { CardSliderData } from "../Libs/type/types";
import { useNotification } from "../Libs/Notification";

const LoginOrderPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardSliderData>();
  const { setOrders } = useNotification();
  const sumbit = (data: CardSliderData) => {
    const existingData = localStorage.getItem("produkt");

    const produktArray = existingData ? JSON.parse(existingData) : [];
    produktArray.push(data);
    localStorage.setItem("produkt", JSON.stringify(produktArray));
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(sumbit)} className="w-full">
        <div>
          <h1 className="text-lg font-semibold my-4">Контактные данные</h1>
          <div>
            <div>
              <label htmlFor="">
                <p>
                  Контактное лицо (ФИО) <span className="text-red-500">*</span>
                </p>
                <input
                  {...register("title", { required: "Enter this role" })}
                  className="input"
                  type="text"
                />
              </label>
              <label htmlFor="">
                <p>
                  Контактный телефон <span className="text-red-500">*</span>
                </p>
                <input
                  {...register("title", { required: "Enter this role" })}
                  type="tel"
                  className="input"
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          <p>Доставка</p>
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                setOrders(0);
              }}
              className="label"
            >
              <input
                type="radio"
                name="delivery"
                className="appearance-none w-6 h-6 border-2 border-red-500 rounded-full checked:bg-red-500 checked:border-transparent relative cursor-pointer"
                defaultChecked
              />
              <div>
                <span className="text-lg font-medium">Самовывоз</span>
                <p className="text-gray-500">На пункте выдачи</p>
              </div>
              <span className="ml-auto text-lg font-bold">+ 0 ₽</span>
            </button>
            <button
              type="button"
              onClick={() => setOrders(300)}
              className="label"
            >
              <input
                defaultChecked
                type="radio"
                name="delivery"
                className="radio"
              />
              <div>
                <span className="text-lg font-medium">Курьером</span>
                <p className="text-gray-500">Доставка курьером</p>
              </div>
              <span className="ml-auto text-lg font-bold">+ 300 ₽</span>
            </button>
          </div>
        </div>
        <div className="h-full ">
          <label htmlFor="">
            <p>Адрес</p>
            <textarea className="textarea" name="" id=""></textarea>
          </label>
          <label htmlFor="">
            <p>Комментарии к заказу</p>
            <textarea className="textarea" name="" id=""></textarea>
          </label>
          <p>Покупатель</p>
          <label htmlFor="" className=" flex-col items-start gap-2">
            <p>
              Email <span className="text-red-500">*</span>
            </p>
            <input
              {...register("title", { required: "Enter this role" })}
              className="input"
              type="email"
            />
            <p>{errors.root?.message}</p>
          </label>
        </div>
        <div>
          <p>
            Способ оплаты<span className="text-red-500"> *</span>
          </p>
          <button
            type="button"
            onClick={() => setOrders(300)}
            className="label"
          >
            <input
              defaultChecked
              type="radio"
              name="delivery"
              className="radio"
            />
            <div>
              <span className="text-lg font-medium">Наличными курьер</span>
              <p className="text-gray-500">Наличнами курьер</p>
            </div>
          </button>
        </div>
        <div>
          <button className="bg-red-500 w-full h-12 rounded-lg text-white">
            Потверждаю заказ
          </button>
        </div>
      </form>
      <style>{`
        input[type='radio']:checked::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.5rem;
          height: 0.5rem;
          background-color: white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
};

export default LoginOrderPage;
