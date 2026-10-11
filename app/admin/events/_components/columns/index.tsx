import { ColumnDef } from "@tanstack/react-table";

import { ExhibitionEventRecord } from "@/types/records";
import { eventDateLabel } from "@/lib/event-display";

import { Checkbox } from "@/components/ui/checkbox";

import { ActionsCell } from "./actions-cell";
import { SortableHeader } from "../../../_components/sortable-header";

export const columns: ColumnDef<ExhibitionEventRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: { label: "Chọn" },
  },

  {
    accessorKey: "name",
    header: () => <span>Tên sự kiện</span>,
    cell: ({ row }) => (
      <span className="font-semibold">{row.original.name}</span>
    ),
    enableSorting: false,
    meta: { label: "Tên sự kiện" },
  },

  {
    accessorKey: "location",
    header: () => <span>Địa điểm</span>,
    cell: ({ row }) => row.original.location,
    enableSorting: false,
    meta: { label: "Địa điểm" },
  },

  {
    accessorKey: "fromDate",
    header: () => <span>Thời gian</span>,
    cell: ({ row }) =>
      eventDateLabel(row.original.fromDate, row.original.toDate),
    enableSorting: false,
    meta: { label: "Thời gian" },
  },

  {
    accessorKey: "createdAt",
    header: () => <SortableHeader label="Ngày tạo" sortKey="createdAt" />,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

      return date.toLocaleString("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },
    meta: { label: "Ngày tạo" },
  },

  {
    accessorKey: "updatedAt",
    header: () => <SortableHeader label="Cập nhật lúc" sortKey="updatedAt" />,
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);

      return date.toLocaleString("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },
    meta: { label: "Cập nhật lúc" },
  },

  {
    id: "actions",
    cell: ({ row }) => <ActionsCell event={row.original} />,
  },
];
