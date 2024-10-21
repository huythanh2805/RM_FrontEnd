import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableToolbar } from "./DataTableToolBar"
import Prompt from "@/components/custom_ui/Prompt"
import { Trash } from "lucide-react"
import DatePicker from "react-datepicker"

export function ReserDataTable({
  columns,
  data,
  onDelete,
  dateValidation,
  handleDateValidation,
  resetDateValidate,
}) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // // pagination
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
        // pageIndex:0
      },
    },
    // Sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // filter
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // Visibility
    onColumnVisibilityChange: setColumnVisibility,
    // Row selection
    onRowSelectionChange: setRowSelection,
    // adding
    enableRowSelection: true,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const hadleDeleteSelectedRows = async () => {
    const rows = table.getFilteredSelectedRowModel().rows
    const IdsArray = rows.map((item) => item.original._id)
    onDelete(IdsArray)
    table.resetRowSelection()
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="w-fit flex items-center">
        <DataTableToolbar table={table} />
        <DatePicker
          className="w-full bg-light-bg dark:bg-dark-bg focus:outline-none px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md"
          placeholderText="Chose the date"
          selected={dateValidation}
          onChange={(date) => handleDateValidation(date)}
          dateFormat={"dd/MM/yyyy, HH:mm"}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
        />
        {dateValidation && (
          <p
            onClick={resetDateValidate}
            className="ml-2 px-2 rounded-full bg-red-1 text-white cursor-pointer"
          >
            X
          </p>
        )}
        <Prompt
          trigger={
            <div className="px-3 py-3 rounded-full cursor-pointer text-white bg-red-1 dark:bg-dark-error hover:scale-90 transition-all ease-in">
              <Trash />
            </div>
          }
          title="Bạn chắc muốn xóa không?"
          prompt="Xóa"
          propmptEvent={() => hadleDeleteSelectedRows()}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-5">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
