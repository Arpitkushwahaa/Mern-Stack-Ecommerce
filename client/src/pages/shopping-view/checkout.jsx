import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder, verifyPayment } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

import { useNavigate } from "react-router-dom";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handlePayment = () => {
    if (!currentSelectedAddress) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    setIsPaymemntStart(true);

    const orderData = {
      user: user?._id,
      orderItems: cartItems.items.map((item) => ({
        qty: item.quantity,
        product: item.productId,
      })),
      shippingAddress: currentSelectedAddress,
      totalPrice: totalCartAmount,
      amount: Math.round(totalCartAmount * 100), // Razorpay expects integer paise
    };

    dispatch(createNewOrder(orderData)).then((result) => {
      if (result.payload && result.payload.data && result.payload.data.id) {
        const newOrderId = result.payload.data.id;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: result.payload.data.amount,
          currency: "INR",
          name: "E-commerce Shopping",
          description: "Test Transaction",
          order_id: newOrderId,
          handler: function (response) {
            dispatch(
              verifyPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              })
            ).then((verificationResult) => {
              if (
                verificationResult.payload &&
                verificationResult.payload.message ===
                  "Payment verified successfully"
              ) {
                toast({ title: "Payment successful" });
                navigate("/shop/payment-success");
              } else {
                toast({ title: "Payment failed", variant: "destructive" });
              }
              setIsPaymemntStart(false);
            });
          },
          prefill: {
            name: user?.username,
            email: user?.email,
          },
          theme: {
            color: "#3399cc",
          },
        };
        if (typeof window.Razorpay === "undefined") {
          toast({
            title: "Payment failed",
            description: "Razorpay SDK not loaded. Please try again in a moment.",
            variant: "destructive",
          });
          setIsPaymemntStart(false);
          return;
        }
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          toast({
            title: "Payment failed",
            description: response.error.description,
            variant: "destructive",
          });
          setIsPaymemntStart(false);
        });
        rzp.open();
      } else {
        toast({
          title: "Failed to create order. Please try again.",
          variant: "destructive",
        });
        setIsPaymemntStart(false);
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handlePayment} className="w-full">
              {isPaymentStart
                ? "Processing Razorpay Payment..."
                : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
