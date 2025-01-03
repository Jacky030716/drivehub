import { h } from "vue";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";
import DataTableDropdownMenu from "./DataTableDropdownMenu.vue";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return h(
        Button,
        {
          class: "p-0",
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase text-left" }, row.getValue("email")),
  },
  {
    accessorKey: "ref_name",
    header: ({ column }) => {
      return h(
        Button,
        {
          class: "p-0",
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Ref Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase text-left" }, row.getValue("ref_name")),
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return h(
        Button,
        {
          class: "p-0",
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Link Url", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h(
      "a", 
      { 
        class: "lowercase text-left line-clamp-1 max-w-xs overflow-hidden text-ellipsis",
        href: row.getValue("url"),
        target: "_blank",
      }, 
      row.getValue("url")),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return h(
        Button,
        {
          class: "p-0",
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Category", h(ArrowUpDown, { class: "h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "capitalized text-left" }, row.getValue("category")),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return h(
  //       "div",
  //       { class: "relative" },
  //       h(DataTableDropdownMenu, {
  //         payment,
  //       })
  //     );
  //   },
  // },
];