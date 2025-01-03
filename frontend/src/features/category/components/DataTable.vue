<script setup>

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import { ref } from 'vue';
import { valueUpdater } from '@/lib/utils';
import { Input } from '@/components/ui/input'
import Button from '@/components/ui/button/Button.vue';
import { ChevronDown, Plus } from 'lucide-vue-next';
import DataTablePagination from '@/components/DataTablePagination.vue';
import { useSheet } from '@/composables/useSheet';

const props = defineProps({
  columns: Array,
  data: Array,
})

const sorting = ref([])
const columnFilters = ref([])
const columnVisibility = ref({})
const rowSelection = ref({})

const { onOpen } = useSheet()

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
})
</script>

<template>
  <div class="border rounded-md p-2 max-w-full">
    <div class="flex justify-between items-center p-4">
      <Input class="max-w-sm" placeholder="Filter emails..." :model-value="table.getColumn('email')?.getFilterValue()"
        @update:model-value=" table.getColumn('email')?.setFilterValue($event)" />

      <div class="space-x-2 flex items-center">
        <Button variant="outline" @click="onOpen">
          Add New Category
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="ml-auto">
              Columns
              <ChevronDown class="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id" class="capitalize" :checked="column.getIsVisible()" @update:checked="(value) => {
                column.toggleVisibility(!!value)
              }">
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <DataTablePagination :table="table" />
  </div>
</template>