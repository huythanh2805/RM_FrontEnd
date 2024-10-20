
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

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useNavigate, useNavigation } from "react-router-dom"
import { ServerUrl } from "@/utilities/utils"
import { toast } from "@/hooks/use-toast"
const formSchemaFunc = (maxSeats) =>
  z.object({
    userName: z.string().min(2).max(50),
    detailAddress: z.string().min(2).max(50),
    phoneNumber: z.string().min(8).max(13),
    party_size: z
      .number()
      .min(1)
      .max(maxSeats, {
        message: `Number must be smaller than seats of table: ${maxSeats}`,
      }),
    payment_method: z.enum(["CASHPAYMENT", "BANKPAYMENT"], {
      required_error: "You need to select a notification type",
    }),
  })

// Form reusable for update and add reservation
export default function ReservationForm({
  reservation,
  tableId,
  numberOfSeats,
}) {
  const [loading, setLoading] = useState(false)
  const [createdReservation, setCreatedReservation] =
    useState(null)
  const router = useNavigate()

  // 1. Define your form.
  const formSchema = formSchemaFunc(numberOfSeats)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: reservation ? reservation?.userName : "",
      phoneNumber: reservation ? reservation?.phoneNumber : "",
      detailAddress: reservation ? reservation.addres_id.detailAddress : "",
      party_size: reservation ? reservation.party_size : 0,
      payment_method: reservation ? reservation.payment_method : "CASHPAYMENT",
    },
  })



  async function onSubmit(values) {
    const url = reservation
      ? ServerUrl+"/api/reservations/" + reservation._id
      : ServerUrl+"/api/reservations"
    setLoading(true)
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json"
        },
        method: reservation ? "PATCH" : "POST",
        body: JSON.stringify({ ...values, table_id:tableId, startTime: new Date()}),
      })
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: reservation
            ? "Can't update reservation"
            : "Can't add new reservation",
        })
      }
      const data = await res.json()
      const reser = data.reservation
      setCreatedReservation(reser)
      toast({
        variant: "sucess",
        title: reservation
          ? data.message
          : "You added new reservation succesfully",
      })
      router("/dashboard/tables")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something wrong with reservation form!",
      })
    }
  }
  function handleResetForm(e) {
    e.preventDefault()
    form.reset()
  }
  function handleOrderedMenu() {
    const reservation_id = createdReservation
      ? createdReservation._id
      : reservation?._id
    router("/dashboard/reservations/orderedFood/" + reservation_id)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tên khách hàng</FormLabel>
                <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                  <Input placeholder="Customer's name" {...field}  className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                  <Input placeholder="Customer's name" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="detailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ chi tiết</FormLabel>
              <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                <Textarea placeholder="Customer's address" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="party_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng khách</FormLabel>
              <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                <Input
                 className="focus-visible:ring-0 focus-visible:ring-offset-0 border-b focus-visible:border-b-blue-1"
                  type="number"
                  placeholder="Party size"
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
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phương thức thanh toán</FormLabel>
              <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="CASHPAYMENT" id="CASHPAYMENT" />
                      <Label htmlFor="CASHPAYMENT" className="cursor-pointer">
                        Tiền mặt
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="BANKPAYMENT" id="BANKPAYMENT" />
                      <Label htmlFor="BANKPAYMENT" className="cursor-pointer">
                        Chyển khoản
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
            type="submit"
            className="mr-4 font-medium text-[16px]"
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
            ) : reservation ? (
              "Cập nhật"
            ) : (
              "Đặt bàn"
            )}
          </Button>

          <Button
            onClick={handleResetForm}
            type="button"
            className="mr-4 font-medium text-[16px]"
          >
            Làm mới
          </Button>

          <Button
            onClick={() => handleOrderedMenu()}
            type="button"
            className={`
            font-medium text-[16px],
              ${(reservation && reservation?.status === "SEATED") ||
                (createdReservation && createdReservation.status === "SEATED")
                ? "opacity-100"
                : "opacity-55 pointer-events-none" } 
            `}
          >
            Chọn món
          </Button>
        </div>
      </form>
    </Form>
  )
}
