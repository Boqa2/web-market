const TrashSticy = () => {
  return (
    <div className="sticky top-24 w-full rounded-lg p-4 bg-slate-300">
      <div className="space-y-5 ">
        <div className="font-medium">
          <div className="flex justify-between">
            <p>Товары(0)</p>
            <p>121213</p>
          </div>
          <div className="flex justify-between">
            <p>Итого</p>
            <p>121312</p>
          </div>
        </div>
        <div>
          <button className="px-4 bg-red-600 flex w-full rounded-lg text-white py-2 font-medium items-center justify-center">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
};

export default TrashSticy;
