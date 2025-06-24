import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder, verifyPayment } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { Shield, RefreshCcw, Bell } from "lucide-react";
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
        <img src={img} className="h-full w-full object-cover object-center" alt="Checkout banner" />
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
      
      {/* Enhanced Policies Section - Full Width */}
      <div className="mt-8 px-5 pb-10">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 shadow-sm border border-primary/20">
          <h3 className="text-xl font-bold mb-6 text-center text-gray-800">Our Customer Policies</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sale Updates Policy */}
            <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Bell className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h4 className="text-base font-semibold text-center mb-2">Sale Updates</h4>
              <p className="text-center text-gray-600">
                You'll be notified when products in your cart or wishlist go on sale, so you never miss out on savings.
              </p>
            </div>
            
            {/* Return Policy */}
            <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                  <RefreshCcw className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h4 className="text-base font-semibold text-center mb-2">Easy Returns</h4>
              <p className="text-center text-gray-600">
                Hassle-free returns within 10-14 days of delivery. We want you to be completely satisfied with your purchase.
              </p>
            </div>
            
            {/* Secure Payment */}
            <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h4 className="text-base font-semibold text-center mb-2">100% Secure Payment</h4>
              <p className="text-center text-gray-600">
                Your transaction is protected with advanced encryption and comprehensive fraud protection measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
