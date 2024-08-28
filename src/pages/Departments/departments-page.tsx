import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Props = {};

export default function DepartmentsPage({}: Props) {
  return (
    <main>
      <div className="max-w-screen-2xl p-4 md:p-10">
        <div className="flex justify-between items-center">
          <PageHeading title="Departments" />
          <Input type="search" className="w-1/2" placeholder="Search..." />
          <Button className="flex justify-between items-center gap-2">
            <Plus /> Department
          </Button>
        </div>
      </div>
    </main>
  );
}
