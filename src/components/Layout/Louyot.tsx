import { Outlet } from "react-router-dom";
import Header from "../UI/Header";
import Footer from "../UI/Footer";
import { Toaster } from "react-hot-toast";

const Louyot = () => {
    return ( 
        <div className="m-0 p-0">
            <Header />
            <Outlet />
            <Toaster/>
            <Footer />
        </div>
     );
}
 
export default Louyot;