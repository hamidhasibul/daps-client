import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type DepartmentCol = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

export const columns: ColumnDef<DepartmentCol>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "status",

    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="text-center">{row.original.active}</div>,
  },
  {
    accessorKey: "actions",

    header: () => <div className="text-center">Actions</div>,
    id: "actions",
    cell: ({ row }) => {
      const department = row.original;

      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(department.id)}
              >
                Copy Department ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
