import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  Github,
  Home,
  Instagram,
  Linkedin,
  Stethoscope,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const routes = [
  { label: "Dashboard", path: "/", icon: <Home className="h-4 w-4" /> },
  {
    label: "Doctors",
    path: "/doctors",
    icon: <Stethoscope className="h-4 w-4" />,
  },
  {
    label: "Appointments",
    path: "/appointments",
    icon: <CalendarCheck className="h-4 w-4" />,
  },
];

interface Props {}

const Sidebar = (props: Props) => {
  return (
    <aside className="fixed top-0 left-0 z-40 pt-20 h-screen w-80 bg-keppel-800">
      <div className="h-full overflow-y-auto px-3 py-4 space-y-10">
        <ul className="space-y-2 font-medium">
          {/* Routes */}

          {routes?.map(({ path, icon, label }, index) => (
            <li key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-keppel-100 hover:bg-keppel-700 hover:text-keppel-200",
                    { "bg-keppel-600 hover:bg-keppel-600": isActive }
                  )
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Separator className="bg-slate-500" />
        <div className="flex flex-col space-y-2 text-xs text-keppel-50">
          <div className="flex items-center space-x-2">
            <Github className="h-4 w-4" />{" "}
            <Link
              to={"https://github.com/hamidhasibul"}
              target="_blank"
              rel="noopener noreferrer"
            >
              @hamidhasibul
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Linkedin className="h-4 w-4" />{" "}
            <Link
              to={"https://www.linkedin.com/in/hamidhasibul"}
              target="_blank"
              rel="noopener noreferrer"
            >
              @hasibulhamid
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Instagram className="h-4 w-4" />{" "}
            <Link
              to={"https://www.instagram.com/riddikuluslydumb/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              @riddikuluslydumb
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
