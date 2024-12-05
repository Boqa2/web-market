import Logo from "../Libs/urls";

const Footer = () => {
  return (
    <div className="px-10 pb-10">
      <div className=" flex my-10 flex-col justify-center items-center gap-10">
        <div>
          <img src={Logo.urllogo} alt="" />
        </div>
        <div className="text-4xl flex gap-14 text-gray-800">
          <i className="bx bxl-telegram"></i>
          <i className="bx bxl-vk"></i>
          <i className="bx bxl-instagram"></i>
        </div>
      </div>
        <div className="flex mt-10 justify-between flex-col md:flex-row items-center">
            <p>© 2020 Любое использование контента без письменного разрешения запрещено</p>
            <p>Интернет-магазин создан на React</p>
        </div>
    </div>
  );
};

export default Footer;
