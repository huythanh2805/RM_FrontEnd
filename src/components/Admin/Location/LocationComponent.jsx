import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus, Trash } from "lucide-react"
import { useMemo, useState } from "react"
import TableComponent from "../table/TableComponent"

export default function LocationComponent(Props) {
  const { location, tables, addNewTable, deleteLocation, updateLocation, deleteTable, updateTable } = Props
  const [inputValue, setInputValue] = useState({
    locationInRestaurant: location.locationInRestaurant,
    location_id: location._id
  })
  const [editModelForTextInput, setEditModelForTextInput] = useState(false)
  const tablesId = useMemo(() => tables.map((table) => table._id), [tables])
  const {
    setNodeRef,
    transform,
    transition,
    listeners,
    attributes,
    isDragging,
  } = useSortable({
    id: location._id,
    data: {
      type: "location",
      location: location,
    },
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDelete = async (_id) => {
    deleteLocation(_id)
  }
  //  For change title location
  const handleupdateLocation = (e) => {
    e.preventDefault()
    setEditModelForTextInput(false)
    updateLocation(inputValue)
  }
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditModelForTextInput(false)
      updateLocation(inputValue)
    }
  }
  const handleChangeInput = (e) => {
    setInputValue(pre => ({
      ...pre,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative rounded-md"
    >
      <Dialog>
        <DialogTrigger className="absolute top-0 right-0 z-30  translate-x-[50%] translate-y-[-50%] hover:scale-90 hover:rotate-45 transition-all duration-300 ease-in-out">
          <div className=" px-2 py-2 rounded-full bg-red-1 border-none text-white dark:text-white">
            <Trash width={20} height={20} />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
          <DialogHeader>
            <DialogTitle>Bạn có chắc muốn xóa không?</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-end py-2 gap-5">
            <DialogClose asChild>
              <Button
                className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Đóng
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                onClick={() => handleDelete(location._id)}
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Xóa
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <div className="relative">
        {
          editModelForTextInput ? (<div className="w-full flex flex-col items-center justify-center bg-light-bg rounded-t-2xl py-2">
            <input
              autoFocus
              type="text"
              name='locationInRestaurant'
              value={inputValue.locationInRestaurant}
              onChange={e => handleChangeInput(e)}
              onBlur={(e) => handleupdateLocation(e)}
              onKeyDown={(e) => handleOnKeyDown(e)}
              className='max-w-[200px] bg-transparent dark:bg-transparent w-full px-2 focus:outline-none'
            />
            <p className='separate_line mt-2'></p>
          </div>) : <div
            onClick={() => setEditModelForTextInput(true)}
            className="w-full flex flex-col items-center justify-center bg-light-bg rounded-t-2xl py-2"
          > {location.locationInRestaurant}
            <p className='separate_line mt-2'></p>
          </div>
        }

        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] auto-rows-max gap-x-11 gap-y-6 rounded-b-2xl bg-light-bg dark:bg-dark-bg overflow-auto px-8 py-2 h-full min-h-[736px] text-light-text dark:text-dark-text">
          <SortableContext items={tablesId} strategy={rectSortingStrategy}>
            {tables.map((table) => (
              <TableComponent
                key={table._id}
                table={table}
                deleteTable={deleteTable}
                updateTable={updateTable}
              />
            ))}

            <div
              onClick={() => addNewTable(location._id)}
              className="min-h-[128px] min-w-[170px] flex items-center justify-center opacity-45 "
            >
              <button className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-dashed border-light-primaryColor dark:border-dark-primaryColor">
                <Plus />
              </button>
            </div>
          </SortableContext>
        </div>
      </div>
    </div>
  )
}
