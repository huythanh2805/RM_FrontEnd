import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { formatCurrency, ServerUrl } from "@/utilities/utils";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const statusOptions = [
  {
    option: "ISPREPARED",
    label: "Đang chuẩn bị",
  },
  {
    option: "ISCOMPLETED",
    label: "Hoàn thành",
  },
  {
    option: "ISCANCELED",
    label: "Đã hủy",
  },
];

const Calculator = ({
  reservation_id,
  orderedFoods,
  setOrderedFoods,
  deleteOrderedFood,
  deletedOrderedCombo,
  updateOrderedFood,
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [neededPaid, setNeededPaid] = useState(0);
  const [paidMoney, setPaidMoney] = useState(0);
  const [change, setChange] = useState(0);
  const [VAT, setVAT] = useState(5);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [billId, setBillId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();
  const totalPrice = orderedFoods.reduce((sum, item) => {
    if (item.status === "ISCANCELED") return sum + 0;
    return sum + item.quantity * item.price;
  }, 0);
  const router = useNavigate();

  useEffect(() => {
    const vat = (5 / 100) * totalPrice;
    setNeededPaid(totalPrice + vat);
    setChange(paidMoney - neededPaid);
  }, [paidMoney, totalPrice]);
  const vt = (5 / 100) * totalPrice;
  const total = totalPrice + vt;
  // delete orderedFood
  const handleDeleteOrderedFood = async (orderedFood_id, type) => {
    console.log(type);
    if (type === "combo") {
      const { res, data } = await deletedOrderedCombo(orderedFood_id);
      if (res.status === 201 && data.message === "Successfully" && setOrderedFoods)
        setOrderedFoods((pre) => [...pre.filter((orderedFood) => orderedFood._id !== orderedFood_id)]);
    }
    if (type === "dish") {
      const { res, data } = await deleteOrderedFood(orderedFood_id);
      if (res.status === 201 && data.message === "Successfully" && setOrderedFoods)
        setOrderedFoods((pre) => [...pre.filter((orderedFood) => orderedFood._id !== orderedFood_id)]);
    }
  };
  const handleClose = () => {
    setPaymentMethod("cash");
    setQrCodeUrl(null);
  };
  // Update orderedFood
  const handleMinus = async (orderedFood_id, quantity, type) => {
    if (quantity < 2) {
      type === "combo" ? await deletedOrderedCombo(orderedFood_id) : await deleteOrderedFood(orderedFood_id);
      setOrderedFoods((prevOrderedFoods) => prevOrderedFoods.filter((item) => item._id !== orderedFood_id));
    }

    await updateOrderedFood(orderedFood_id, quantity - 1, type);
    if (!setOrderedFoods) return;
    setOrderedFoods((prevOrderedFoods) =>
      prevOrderedFoods.map((item) => (item._id === orderedFood_id ? { ...item, quantity: quantity - 1 } : item))
    );
  };
  const handlePlus = async (orderedFood_id, quantity, type) => {
    await updateOrderedFood(orderedFood_id, quantity + 1, type);
    if (!setOrderedFoods) return;
    setOrderedFoods((prevOrderedFoods) =>
      prevOrderedFoods.map((item) => (item._id === orderedFood_id ? { ...item, quantity: quantity + 1 } : item))
    );
  };
  //  Format currency
  const handlePaidMoney = (value, name, values) => {
    setPaidMoney(value);
  };
  const handleGoBack = () => {
    router.back();
  };
  const generateQrCodeUrl = (total) => {
    const bank = "MB";
    const account = "0386426150";
    const template = "compact";
    const qrUrl = `https://qr.sepay.vn/img?bank=${encodeURIComponent(bank)}&acc=${encodeURIComponent(
      account
    )}&template=${encodeURIComponent(template)}&amount=${encodeURIComponent(
      total
    )}&des=HDTT%5FGOLDENFORK%5F${reservation_id}`;
    return qrUrl;
  };

  const handlePaymentMethodChange = (value) => {
    if (value === "transfer") {
      const qrUrl = generateQrCodeUrl(total);
      setQrCodeUrl(qrUrl);
    } else {
      setQrCodeUrl("");
    }
  };
  const handleMethodChange = (value) => {
    setPaymentMethod(value);
    handlePaymentMethodChange(value);
  };

  const handlePayment = async () => {
    if (change < 0) {
      return toast({
        variant: "destructive",
        title: "Please pay all for bill",
      });
    }
    try {
      const res = await fetch(`https://fc02-116-96-44-27.ngrok-free.app/api/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservation_id,
          original_money: totalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Something went wrong while creating the bill.",
        });
      }

      setBillId(data.bill_id);

      setIsPaid(true);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong while creating the bill.",
      });
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Xử lý khi checkbox "chọn tất cả" được thay đổi
  const handleSelectAll = () => {
    if (selectedRows.length === orderedFoods.length) {
      setSelectedRows([]);
    } else {
      const allIds = orderedFoods.map((orderedFood) => orderedFood._id);
      setSelectedRows(allIds);
    }
  };

  const updateOrderedDishesStatus = async (status) => {
    if (selectedRows.length < 1) return;
    try {
      const res = await fetch(ServerUrl + "/api/orderedFood", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedRows: selectedRows,
          statusValue: status,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Something wrong with update status",
        });
      }
      setOrderedFoods((currenntStatus) =>
        currenntStatus.map((item) => (selectedRows.includes(item._id) ? { ...item, status: status } : item))
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something wrong with update status",
      });
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:1111");

    socket.on("bank-payment-success", (notification) => {
      console.log("da thanh toan thanh cong");
      setIsPaid(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="px-3 py-4 max-h-[800px] min-w-[650px] overflow-scroll">
      <Table>
        <TableHeader>
          <TableRow onClick={handleSelectAll}>
            <TableHead className="min-w-[200px] text-xl">Tên</TableHead>
            <TableHead className="text-xl">Số lượng</TableHead>

            <TableHead className="text-right min-w-[105px] text-xl">Thành tiền</TableHead>
            <TableHead className="max-w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedFoods?.map((orderedFood) => (
            <TableRow onClick={() => handleCheckboxChange(orderedFood._id)} key={orderedFood._id}>
              <TableCell className="font-medium">
                <div className="flex items-center justify-start gap-2 md:gap-4">
                  <div className="w-16 h-16 flex items-center justify-center overflow-hidden rounded-full">
                    <img src={orderedFood.images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col leading-7 truncate w-[150px] text-nowrap text-ellipsis overflow-hidden">
                    <h2 className="text-xl truncate">{orderedFood.name}</h2>
                    <p className="text-light-textSoft dark:text-dark-textSoft font-thin text-lg">
                      {formatCurrency(orderedFood.price)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMinus(orderedFood._id, orderedFood.quantity, orderedFood.type);
                    }}
                    className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadow"
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span className="text-2xl">{orderedFood.quantity}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlus(orderedFood._id, orderedFood.quantity, orderedFood.type);
                    }}
                    className="px-3 py-2 text-white bg-blur_bg dark:bg-blur_bg rounded-lg cursor-pointer hover:scale-[80%] transition-all ease-in hover:shadow-button_shadow"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </TableCell>

              <TableCell className="text-right text-xl">
                {formatCurrency(orderedFood.quantity * orderedFood.price)}
              </TableCell>

              <TableCell className={"max-w-8"}>
                <button
                  onClick={() => handleDeleteOrderedFood(orderedFood._id, orderedFood.type)}
                  className="w-full flex items-center justify-center text-xl text-red-1 hover:scale-110"
                >
                  X
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-light-bg_2 dark:bg-dark-bg_2 w-full">
            <TableCell colSpan={2} className="text-[20px] font-medium text-xl">
              Tổng
            </TableCell>

            <TableCell />

            <TableCell colSpan={2} className="text-right text-2xl">
              {formatCurrency(totalPrice)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {reservation_id && (
        <div className="w-full py-4 flex gap-5">
          <Button
            onClick={() => router("/admin/tables")}
            className="flex-1 py-6 text-[17px] text-white dark:text-white bg-red-1 dark:bg-red-1 hover:scale-95 transition-transform duration-150 ease-linear"
          >
            Quay lại
          </Button>
          <Dialog>
            <DialogTrigger className="flex-1">
              <Button className="w-full py-6 text-[17px] text-white dark:text-white bg-green-1 dark:bg-green-1 hover:scale-95 transition-transform duration-150 ease-linear">
                Thanh toán
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-light-bg  gap-0 min-w-[400px] h-auto xl:min-w-[1200px] xl:h-[800px]">
              <div className="flex items-start justify-between">
                <div className="min-w-[450px] px-10 order-2 h-full ">
                  <div className="w-full flex items-center py-2">
                    <p className="flex-1 h-full bg-light-bg dark:bg-dark-bg_2 flex items-center justify-start px-2">
                      Tổng tiền
                    </p>
                    <Input
                      className=" flex-[2] rounded-none placeholder:text-light-textSoft dark:placeholder:text-dark-textSoft
                    placeholder:font-semibold dark:placeholder:font-semibold placeholder:text-[17px] dark:placeholder:text-[17px]"
                      disabled
                      type="number"
                      placeholder={formatCurrency(totalPrice)}
                    />
                  </div>
                  <div className="w-full flex items-center py-2">
                    <p className="flex-1 h-full bg-light-bg dark:bg-dark-bg_2 flex items-center justify-start px-2">
                      VAT
                    </p>
                    <Input
                      className=" flex-[2] rounded-none placeholder:text-light-textSoft dark:placeholder:text-dark-textSoft
                    placeholder:font-semibold dark:placeholder:font-semibold placeholder:text-[17px] dark:placeholder:text-[17px]"
                      disabled
                      type="number"
                      placeholder={`${VAT}%`}
                    />
                  </div>
                  <div className="w-full flex items-center py-2">
                    <p className="flex-1 h-full bg-light-bg dark:bg-dark-bg_2 flex items-center justify-start px-2">
                      Cần thanh toán
                    </p>
                    <Input
                      className=" flex-[2] rounded-none placeholder:text-light-textSoft dark:placeholder:text-dark-textSoft
                    placeholder:font-semibold dark:placeholder:font-semibold placeholder:text-[17px] dark:placeholder:text-[17px]"
                      disabled
                      type="number"
                      placeholder={formatCurrency(neededPaid)}
                    />
                  </div>
                  <div className="w-full flex items-center py-2">
                    <p className="flex-1 h-full bg-light-bg dark:bg-dark-bg_2 flex items-center justify-start px-2">
                      Phương thức thanh toán
                    </p>
                    <select onChange={(e) => handleMethodChange(e.target.value)}>
                      <option value="cash">Tiền mặt</option>
                      <option value="transfer">Chuyển khoản</option>
                    </select>
                  </div>
                  {paymentMethod === "transfer" && qrCodeUrl && (
                    <div className="mt-4 text-center">
                      <p>Quét mã QR để thanh toán:</p>
                      <img src={qrCodeUrl} alt="QR code for payment" className="mx-auto" />
                    </div>
                  )}

                  <div className="flex items-center justify-end py-2 gap-5 mt-12">
                    <DialogClose asChild>
                      <Button
                        onClick={handleClose}
                        className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                    text-white dark:text-white hover:scale-90 transition-all ease-in text-lg"
                      >
                        Đóng
                      </Button>
                    </DialogClose>
                    {paymentMethod === "cash" && (
                      <DialogClose asChild>
                        <Button
                          onClick={handlePayment}
                          className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error text-white dark:text-white hover:scale-90 transition-all ease-in text-lg"
                        >
                          Thanh toán
                        </Button>
                      </DialogClose>
                    )}
                  </div>
                </div>
                <Table className="max-w-[650px] order-1 hidden xl:block">
                  <TableHeader className="max-w-[650px]">
                    <TableRow>
                      <TableHead className="min-w-[200px] text-xl">Tên</TableHead>
                      <TableHead className="text-xl">Số lượng</TableHead>
                      {/* <TableHead className="text-xl">Trạng thái</TableHead> */}
                      <TableHead className="text-right min-w-[105px] text-xl">Thành tiền</TableHead>
                      <TableHead className="max-w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-w-[650px]">
                    {orderedFoods?.map((orderedFood) => (
                      <TableRow key={orderedFood._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-start gap-2 md:gap-4">
                            <div className="w-16 h-16 flex items-center justify-center overflow-hidden rounded-full">
                              <img src={orderedFood.images[0]} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col leading-7 truncate w-[150px] text-nowrap text-ellipsis overflow-hidden">
                              <h2 className="text-xl truncate">{orderedFood.name}</h2>
                              <p className="text-light-textSoft dark:text-dark-textSoft font-thin text-lg">
                                {formatCurrency(orderedFood.price)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{orderedFood.quantity}</span>
                          </div>
                        </TableCell>

                        <TableCell className="text-right text-xl">
                          {formatCurrency(orderedFood.quantity * orderedFood.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="bg-light-bg  w-full">
                      <TableCell colSpan={2} className="text-[20px] font-medium text-xl">
                        Tổng
                      </TableCell>

                      <TableCell />

                      <TableCell colSpan={2} className="text-right text-2xl">
                        {formatCurrency(totalPrice)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <p className="ver_separate_line min-h-full hidden xl:block"></p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <Dialog open={isPaid} onOpenChange={setIsPaid}>
        <DialogContent className="max-w-[330px] md:max-w-[450px] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md text-white dark:text-white">
          <DialogHeader className="w-full flex flex-col items-center justify-center gap-3 ">
            <DialogTitle className="text-[25px] font-normal text-light-text dark:text-dark-text">
              Thank You!
            </DialogTitle>
            <div className="px-2 py-2 rounded-full border-[6px] border-green-1 ">
              <Check width={85} height={85} className="text-green-1" />
            </div>
          </DialogHeader>
          <div className="w-full">
            <h2 className="leading-6 text-center text-light-text dark:text-dark-text">
              Cảm ơn bạn đã dùng dịch vụ nhà hàng của chúng tôi. Check your bill?
            </h2>
          </div>
          <div className="flex items-center justify-end py-2 gap-5">
            <DialogClose asChild>
              <Button
                onClick={() => navigate("/admin/bills")}
                className="bg-light-success dark:bg-dark-success hover:bg-light-success dark:hover:bg-dark-success 
                text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Đóng
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => router(`/admin/completedBill/${billId}`)}
                className="bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error 
              text-white dark:text-white hover:scale-90 transition-all ease-in"
              >
                Check bill
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Calculator;
