import Head from "./header.jsx";
import Foot from "./footer.jsx";
import { Outlet } from "react-router-dom";

const AppLay = () => {
  return (
    <>
      <Head />
      <Outlet />
      <Foot />
    </>
  );
};

export default AppLay;
