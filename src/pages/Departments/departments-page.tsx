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
      id: "728ed52f",
      name: "Medicine",
      description: "pending",
      active: false,
    },
  ];
  return (
    <main>
      <div className="max-w-screen-2xl p-4 md:p-10">
        <div className="flex justify-between items-center mb-10">
          <PageHeading title="Departments" />
          <Input type="search" className="w-1/2" placeholder="Search..." />
          <Button className="flex justify-between items-center gap-2">
            <Plus /> Department
          </Button>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
