import { ColumnDef } from "@tanstack/react-table";

import { ClientRecord } from "@/types/records";

import { Checkbox } from "@/components/ui/checkbox";

import { ActionsCell } from "./actions-cell";

export const columns: ColumnDef<ClientRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Họ tên",
    cell: ({ row }) => (
      <div>
        <p className="font-semibold">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "companyName",
    header: "Công ty",
    cell: ({ row }) => row.original.companyName,
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
    cell: ({ row }) => row.original.phone,
  },
  {
    accessorKey: "description",
    header: "Nội dung",
    cell: ({ row }) => (
      <p className="max-w-[240px] truncate">{row.original.description}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleString("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell client={row.original} />,
  },
];
