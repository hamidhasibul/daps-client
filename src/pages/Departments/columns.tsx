import { ColumnDef } from "@tanstack/react-table";

export type DepartmentCol = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

export const columns: ColumnDef<DepartmentCol>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
