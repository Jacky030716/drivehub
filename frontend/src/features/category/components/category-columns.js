import { h } from "vue";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "@/components/Actions.vue";

export const categoryColumns = [
  {
    accessorKey: "categoryName",
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
    cell: ({ row }) => h("div", { class: "capitalized text-left w-full flex-1" }, row.getValue("categoryName")),
  },
  {
    accessorKey: "linkCount",
    header: ({ column }) => {
      return h(
        Button,
        {
          class: "p-0",
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Links", h(ArrowUpDown, { class: "h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "text-left w-full flex-1" }, row.getValue("linkCount")),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return h(Actions, {
        id: row.original.id,
      })
    },
  },
];