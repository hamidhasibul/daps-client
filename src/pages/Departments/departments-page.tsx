import { DataTable } from "@/components/data-table";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { columns } from "./columns";

type Props = {};

export default function DepartmentsPage({}: Props) {
  const data = [
    {
      id: "a1b2c3d4",
      name: "Cardiology",
      description: "Lorem ipsum dolor sit amet.",
      active: true,
    },
    {
      id: "e5f6g7h8",
      name: "Neurology",
      description: "Consectetur adipiscing elit.",
      active: false,
    },
    {
      id: "i9j0k1l2",
      name: "Orthopedics",
      description: "Sed do eiusmod tempor incididunt.",
      active: true,
    },
    {
      id: "m3n4o5p6",
      name: "Pediatrics",
      description: "Ut labore et dolore magna aliqua.",
      active: false,
    },
    {
      id: "q7r8s9t0",
      name: "Radiology",
      description: "Ut enim ad minim veniam.",
      active: true,
    },
    {
      id: "u1v2w3x4",
      name: "Oncology",
      description: "Quis nostrud exercitation ullamco.",
      active: false,
    },
    {
      id: "y5z6a7b8",
      name: "Emergency Medicine",
      description: "Laboris nisi ut aliquip ex ea commodo.",
      active: true,
    },
    {
      id: "c9d0e1f2",
      name: "Gastroenterology",
      description: "Duis aute irure dolor in reprehenderit.",
      active: false,
    },
    {
      id: "g3h4i5j6",
      name: "Dermatology",
      description: "In voluptate velit esse cillum.",
      active: true,
    },
    {
      id: "k7l8m9n0",
      name: "Endocrinology",
      description: "Excepteur sint occaecat cupidatat non.",
      active: false,
    },
  ];
  return (
    <main>
      <div className="max-w-screen-2xl p-4 md:p-10">
        <div className="flex justify-between items-center mb-10">
          <PageHeading title="Departments" />
          <Input type="search" className="w-1/2" placeholder="Search..." />
          <Button
            className="flex justify-between items-center gap-2"
            variant={"main"}
          >
            <Plus /> Department
          </Button>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
