import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import { buttonVariants } from "./ui/button";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <nav className="container p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          {/* Logo */}
          <img src={logo} alt="..." className="w-8 h-8" />

          {/* Nav Links */}

          <div className="space-x-8 font-bold">
            <NavLink to={"/"}>Features</NavLink>
            <NavLink to={"/"}>Pricing</NavLink>
          </div>
        </div>

        {/* AUth Links */}

        <div className="flex items-center font-bold space-x-6">
          <Link to={"/register"}>Signup</Link>
          <Link
            to={"/login"}
            className={buttonVariants({ variant: "default" })}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
