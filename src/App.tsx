import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-80 mt-20">
        <Outlet />
      </div>
    </>
  );
}

export default App;
