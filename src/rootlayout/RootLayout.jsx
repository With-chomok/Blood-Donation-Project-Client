import { Outlet } from "react-router";

import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";


const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar></Navbar>
      <div className="flex-1 container mx-auto">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  )
};

export default RootLayout;