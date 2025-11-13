import { Outlet } from "react-router";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import backgroundImage from "./assets/Images/top-view-green-bowl-with-colorful-cereals.jpg";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100%",
      }}
    >
      <header className="sticky top-0 z-10">
        <Nav></Nav>
      </header>
      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
