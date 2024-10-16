type Props = {
  openSidebar: () => void;
};
const SideBar = ({ openSidebar }: Props) => {
  return (
    <>
      <div className="bg-amber-800 absolute flex overflow-y-scroll justify-between top-0 left-0 w-2/6 h-full">
        <div></div>
      </div>
      <button className="absolute right-[800px] w-10 h-10 border shadow-2xl flex justify-center items-center  rounded-[50%]" onClick={openSidebar}>
      <i className='bx bx-x'></i>
      </button>
    </>
  );
};

export default SideBar;