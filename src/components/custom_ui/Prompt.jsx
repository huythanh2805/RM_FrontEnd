import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Prompt({propmptEvent, title, prompt, trigger}) {
  return (
    <Dialog>
    <DialogTrigger className="mx-3">
      {trigger}
    </DialogTrigger>
    <DialogContent className="bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
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
          onClick={propmptEvent}
          className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
        text-white dark:text-white hover:scale-90 transition-all ease-in"
        >
          {prompt}
        </Button>
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
  )
}
