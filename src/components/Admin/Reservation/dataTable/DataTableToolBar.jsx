import { DataTableViewOptions } from "./DataTableViewOptions"
import { RotateCcw } from "lucide-react"
import { DataTableFacetedFilter } from "./DataTableFacetedFilter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export const statuses = [
  {
    value: "RESERVED",
    label: "RESERVED",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "SEATED",
    label: "SEATED",
    // icon: CircleIcon,
  },
  {
    value: "ISNOTPAID",
    label: "ISNOTPAID",
    // icon: CircleIcon,
  },
  {
    value: "COMPLETED",
    label: "COMPLETED",
    // icon: StopwatchIcon,
  },
  {
    value: "CANCELED",
    label: "CANCELED",
    // icon: CheckCircledIcon,
  },
]
export function DataTableToolbar({
  table,
}) {
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="flex items-center max-w-fit">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter userName..."
          value={(table.getColumn("userName")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("userName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] px-3 py-5 bg-light-bg_2 dark:bg-dark-bg_2"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
       
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RotateCcw className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}