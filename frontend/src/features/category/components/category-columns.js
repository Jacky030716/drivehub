import { h } from "vue";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";
import { Checkbox } from "@/components/ui/checkbox";
import Actions from "@/components/Actions.vue";

export const categoryColumns = [
  // {
  //   id: "select",
  //   header: ({ table }) =>
  //     h(Checkbox, {
  //       checked: table.getIsAllPageRowsSelected(),
  //       "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
  //       ariaLabel: "Select all",
  //     }),
  //   cell: ({ row }) =>
  //     h(Checkbox, {
  //       checked: row.getIsSelected(),
  //       "onUpdate:checked": (value) => row.toggleSelected(!!value),
  //       ariaLabel: "Select row",
  //     }),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
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
    cell: ({ row }) => h("div", { class: "capitalized text-left w-full flex-1" }, row.getValue("name")),
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