import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>

      
      <main className="relative flex-grow ">
        <Outlet />
      </main>

      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
