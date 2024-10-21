import { Button } from "@/components/ui/button"
import { 
    DropdownMenu, 
    DropdownMenuCheckboxItem, 
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function DataTableViewOptions({
  table,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mx-2 hidden h-8 lg:flex py-5 px-3 bg-light-bg_2 dark:bg-dark-bg_2"
        >
          {/* <MixerHorizontalIcon className="mr-2 h-4 w-4" /> */}
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] bg-light-bg_2 dark:bg-dark-bg_2" >
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}