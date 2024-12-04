import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Discount from "@/pages/home/Discount"

export function ComboBoxComponent({userDiscounts, couponValue, setCouponValue}) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const [commanItems, setCommanItems] = React.useState([])

  React.useEffect(()=>{
    if(userDiscounts == null) return
    if(userDiscounts)
    setCommanItems(userDiscounts)
  },[userDiscounts])
  React.useEffect(()=>{
    if(userDiscounts == null) return
    if(searchTerm === "") return setCommanItems(userDiscounts)
    const filteredDiscounts = userDiscounts.filter(discount =>
      discount.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCommanItems(filteredDiscounts)
  },[searchTerm, userDiscounts])
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {couponValue && userDiscounts
            ? userDiscounts.find((discount) => discount._id === couponValue)?.code
            : "Chọn mã giảm giá"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0">
        <Command>
          <CommandInput
            placeholder="Tìm giảm giá"
            onInput={(e) => setSearchTerm(e.target.value)}
          />
          <CommandList>
            <CommandEmpty>Không tìm thấy mã</CommandEmpty>
            <CommandGroup>
              {
                commanItems.map((userDiscount) => (
                  <CommandItem
                    key={userDiscount._id}
                    value={userDiscount._id}
                    onSelect={(currentValue) => {
                      setCouponValue(currentValue === couponValue ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="flex items-center justify-center py-2"
                  >
                    <Discount
                  key={userDiscount._id}
                  _id={userDiscount._id}
                  code={userDiscount.code}
                  status={userDiscount.status}
                  buttonTitle={'Dùng'}
                  type={userDiscount.discountId.discountType}
                  expriedDate={userDiscount.discountId.expireDate}
                  discountValue={userDiscount.discountId.discountValue}
                  minOrderValue={userDiscount.discountId.minOrderValue}
                  // handleClick={handleUseCoupon}
                />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
