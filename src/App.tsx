import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "./pages/Home/Navbar";
import Footer from "./pages/Home/Footer";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
