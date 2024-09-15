import { DataTable } from "@/components/data-table";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { useDepartments } from "@/services/queries/departments";
import { usePagination } from "@/hooks/use-pagination";
import { useState } from "react";

type Props = {};

export default function DepartmentsPage({}: Props) {
  const [search, setSearch] = useState<string>("");
  const { pagination, onPaginationChange } = usePagination();
  const { data, isLoading } = useDepartments(pagination);

  return (
    <main>
      <div className="max-w-screen-2xl p-4 md:p-10">
        <div className="flex justify-between items-center mb-10">
          <PageHeading title="Departments" />
          <Input
            type="search"
            className="w-1/2"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            className="flex justify-between items-center gap-2"
            variant={"main"}
          >
            <Plus /> Department
          </Button>
        </div>
        {isLoading && (
          <>
            <h1>Loading...</h1>
          </>
        )}
        {data && data.success && (
          <>
            <DataTable
              columns={columns}
              data={data.departments}
              rowCount={data.count}
              pagination={pagination}
              onPaginationChange={onPaginationChange}
            />
          </>
        )}
      </div>
    </main>
  );
}
