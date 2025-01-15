import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
const DialogComponent = ({ children, onClick }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc muốn hủy món không</DialogTitle>
          <DialogDescription>
            <div className="w-full py-3 flex items-center justify-end">
            <DialogTrigger>
              <Button
                type="button"
                className="mr-4 font-medium text-[16px] bg-red-1 hover:bg-red-1 text-white hover:opacity-80 transition-all duration-300 ease-in-out"
              >
                Thoát 
              </Button>
            </DialogTrigger>
            <DialogTrigger>
              <Button
                onClick={onClick}
                type="button"
                className="mr-4 font-medium text-[16px] bg-green-1 hover:bg-green-1 text-white hover:opacity-80 transition-all duration-300 ease-in-out"
              >
                Xác nhận
              </Button>
            </DialogTrigger>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogComponent
