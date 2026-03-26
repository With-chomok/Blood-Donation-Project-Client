import { Outlet, useNavigation } from "react-router";

import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Loading from "../components/Loader/Loading";


const RootLayout = () => {
   const navigation = useNavigation();
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar></Navbar>
      <div className="flex-1 container mx-auto">
        {navigation.state === "loading" && <Loading />}
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  )
};

export default RootLayout;