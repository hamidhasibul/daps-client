import { User } from "@/api/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "@/services/mutations/auth";

interface Props {
  user: User;
  isPending: boolean;
}

function DropdownProfile({ user, isPending }: Props) {
  const { mutate: logout } = useLogout();

  if (isPending) {
    return <Loader className="animate-spin" />;
  }

  const initials = `${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}`;

  function onLogout() {
    logout();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user.image} alt="user image" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={"/settings"}>
          <DropdownMenuItem className="cursor-pointer">
            <UserRoundCog className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownProfile;
