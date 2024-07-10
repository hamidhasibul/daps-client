import { Link } from "react-router-dom";
import logo from "../assets/daps-logo-placeholder.svg";
import { Bell, Mail } from "lucide-react";
import DropdownProfile from "./dropdown-account";
import { useProfile } from "@/services/queries/me";

interface Props {}

const Navbar = (props: Props) => {
  // const { user } = useStore();
  const { data: user, isPending } = useProfile();

  return (
    <nav className="fixed top-0 z-50 w-full p-4 px-8 shadow-md bg-keppel-50">
      <div className="flex items-center justify-between space-x-20">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} alt="logo" className="" />
        </Link>
        <div className="flex items-center justify-between space-x-10">
          <Mail className="h-5 w-5 hover:bg-gray-50" />
          <Bell className="h-5 w-5 rounded-full" />
          <DropdownProfile user={user!} isPending={isPending} />
          {/* <div className="">
            <img
              src={userIcon}
              alt="user"
              className="h-6 w-6 rounded-full ring-2 ring-keppel-500"
            />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
