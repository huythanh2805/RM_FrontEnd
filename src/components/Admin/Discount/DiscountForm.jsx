import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { formatCurrency, ServerUrl } from "@/utilities/utils"
import { toast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import jwtDecode from "jwt-decode"
const formSchemaFunc = () =>
  z.object({
    discountValue: z
      .number()
      .min(1, { message: "Giá trị giảm giá phải lớn hơn hoặc bằng 1" }),
    expireDate: z.date(),
    minOrderValue: z.number(),
    totalQuantity: z
      .number()
      .min(1, { message: "Số lượng mã phải lớn hơn hoặc bằng 1" }),
    // isActive: z.boolean().optional(),
    discountType: z.enum(["FIXEDAMOUNT", "PERCENTAGE"], {
      required_error: "Bạn cần phải chọn kiểu cho phiếu giảm giá",
    }),
  })

// Form reusable for update and add reservation
export default function DiscountForm({ discount, id }) {
  const [loading, setLoading] = useState(false)
  const [decodedToken, setDecodeToken] = useState(() => {
    const token = localStorage.getItem("token")
    if (!token) return null
    return jwtDecode(token)
  })

  const router = useNavigate()

  // 1. Define your form.
  const formSchema = formSchemaFunc()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discountValue: discount ? discount.discountValue : 0,
      expireDate: discount ? new Date(discount.expireDate) : undefined,
      minOrderValue: discount ? discount.minOrderValue : 0,
      totalQuantity: discount ? discount.totalQuantity : 0,
      discountType: discount ? discount.discountType : "FIXEDAMOUNT",
    },
  })

  async function onSubmit(values) {
    if (
      values.discountType === "PERCENTAGE" &&
      Number(values.discountValue) >= 100
    )
      return toast({
        variant: "destructive",
        title: "Bạn không được tạo phiếu lớn hơn 100%",
      })
    const url = discount
      ? ServerUrl + "/api/discount/" + id
      : ServerUrl + "/api/discount"
    setLoading(true)
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: discount ? "PATCH" : "POST",
        body: JSON.stringify({ ...values, userId: decodedToken.id }),
      })
      const data = await res.json()
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: data.message,
        })
      }
      toast({
        variant: "success",
        title: data.message,
      })
      if (discount) {
        router("/admin/listDiscounts")
      }
      setLoading(false)
      form.reset()
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something wrong with discount form!",
      })
    } finally {
      setLoading(false)
    }
  }
  function handleResetForm(e) {
    e.preventDefault()
    form.reset()
  }
  //   function handleOrderedMenu() {
  //     const reservation_id = createdReservation
  //       ? createdReservation._id
  //       : reservation?._id
  //     router("/admin/reservations/orderedFood/" + reservation_id)
  //   }
  return (
    <Form id="discountForm" {...form}>
      <form id="discountForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="discountValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá trị phiếu</FormLabel>
              <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                <Input
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"
                  type="number"
                  placeholder="Nếu tính theo phần trăm thì hãy nhập % muốn giảm"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minOrderValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá trị đơn tối thiểu</FormLabel>
              <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                <Input
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"
                  type="number"
                  placeholder="Giá trị đơn tối thiểu"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng phiếu</FormLabel>
              <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                <Input
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"
                  type="number"
                  placeholder="Số lượng phiếu"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expireDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày hết hạn</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"
                  type="date"
                  {...field}
                  min={new Date().toISOString().split("T")[0]}
                  // Chuyển đổi giá trị thành định dạng YYYY-MM-DD
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    // Chuyển đổi ngược lại thành Date object
                    const date = e.target.value
                      ? new Date(e.target.value)
                      : undefined
                    field.onChange(date)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kiểu của phiếu</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="FIXEDAMOUNT" id="FIXEDAMOUNT" />
                      <Label htmlFor="FIXEDAMOUNT" className="cursor-pointer">
                        Giảm tiền
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="PERCENTAGE" id="PERCENTAGE" />
                      <Label htmlFor="PERCENTAGE" className="cursor-pointer">
                        Giảm phần trăm
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center">
          <Button
            onClick={() => router("/admin/tables")}
            type="button"
            className="mr-4 font-medium text-[16px] bg-red-1 hover:bg-red-1 hover:opacity-80 transition-all duration-300 ease-in-out"
          >
            Quay lại
          </Button>
          <Button
            onClick={handleResetForm}
            type="button"
            className="mr-4 font-medium text-[16px] bg-yellow-1 hover:bg-yellow-1"
          >
            Làm mới
          </Button>
          {form.getValues("discountType") === "FIXEDAMOUNT" &&
             (
              <Dialog>
                <DialogTrigger>
                    <Button
                      type="button"
                      className="mr-4 font-medium text-[16px] bg-blue-1 hover:bg-blue-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader
                          color={"#11cdef"}
                          loading={loading}
                          size={35}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : discount ? (
                        "Cập nhật"
                      ) : (
                        "Tạo Phiếu"
                      )}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-normal leading-7 px-3">
                      Bạn có chắc muốn tạo phiếu với mức giảm cố định {formatCurrency(Number(form.getValues("discountValue")))} không ?
                      </DialogTitle>
                      <div className="w-full flex items-center justify-end">
                      <DialogTrigger>
                    <Button
                      form="discountForm"
                      type="submit"
                      className="mr-4 font-medium text-[16px] bg-blue-1 hover:bg-blue-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader
                          color={"#11cdef"}
                          loading={loading}
                          size={35}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : discount ? (
                        "Cập nhật"
                      ) : (
                        "Tạo Phiếu"
                      )}
                    </Button>
                      </DialogTrigger>
                      </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          {form.getValues("discountType") === "PERCENTAGE" &&
           (
              <Dialog>
                <DialogTrigger>
                    <Button
                      type="button"
                      className="mr-4 font-medium text-[16px] bg-blue-1 hover:bg-blue-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader
                          color={"#11cdef"}
                          loading={loading}
                          size={35}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : discount ? (
                        "Cập nhật"
                      ) : (
                        "Tạo Phiếu"
                      )}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-normal leading-7 px-3">
                      Bạn có chắc muốn tạo phiếu với mức giảm {Number(form.getValues("discountValue"))}% trên đơn không ?
                      </DialogTitle>
                   <div className="w-full flex items-center justify-end">
                   <DialogTrigger>
                    <Button
                      form="discountForm"
                      type="submit"
                      className="mr-4 font-medium text-[16px] bg-blue-1 hover:bg-blue-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader
                          color={"#11cdef"}
                          loading={loading}
                          size={35}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : discount ? (
                        "Cập nhật"
                      ) : (
                        "Tạo Phiếu"
                      )}
                    </Button>
                    </DialogTrigger>
                   </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
          )}
          
        </div>
      </form>
    </Form>
  )
}
