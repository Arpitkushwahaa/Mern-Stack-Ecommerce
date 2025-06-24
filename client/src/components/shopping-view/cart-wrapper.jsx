import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { Shield, RefreshCcw, Bell } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent key={item._id} cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
      
      {/* Policies Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold mb-4">Our Policies</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Bell className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-medium">Sale Updates</h4>
              <p className="text-xs text-muted-foreground">
                You'll be notified when products in your cart or wishlist go on sale.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <RefreshCcw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-medium">Return Policy</h4>
              <p className="text-xs text-muted-foreground">
                Easy returns within 10-14 days of delivery. See our return policy for details.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-medium">Secure Payment</h4>
              <p className="text-xs text-muted-foreground">
                100% secure payment processing with encryption and fraud protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
