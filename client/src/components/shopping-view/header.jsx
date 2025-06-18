import { HousePlug, LogOut, Menu, Search, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeItem, setActiveItem] = useState(null);

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    setActiveItem(getCurrentMenuItem.id);

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  useEffect(() => {
    // Set active item based on current path
    const path = location.pathname;
    const currentItem = shoppingViewHeaderMenuItems.find(item => 
      path.includes(item.id) || path.endsWith(item.path));
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      setActiveItem("home");
    }
  }, [location.pathname]);

  return (
    <nav className="w-full flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 py-4 border-b">
  {shoppingViewHeaderMenuItems.map((menuItem) => (
    <Label
      key={menuItem.id}
      onClick={() => handleNavigate(menuItem)}
      className={`relative text-sm font-medium cursor-pointer px-1 py-2 transition-colors duration-300
        ${activeItem === menuItem.id 
          ? "text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary" 
          : "text-muted-foreground hover:text-black after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"}`}
    >
      {menuItem.label}
    </Label>
  ))}
</nav>

  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  const cartItemsCount = cartItems?.items?.length || 0;

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <div className="relative hidden lg:flex items-center border rounded-full overflow-hidden px-3 py-1 focus-within:ring-1 focus-within:ring-primary">
        <Input 
          type="text" 
          placeholder="Search products..." 
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent w-36 md:w-48 lg:w-64"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/shop/search?query=${e.target.value}`);
            }
          }}
        />
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>

      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative bg-transparent hover:bg-primary/10 transition-all duration-200 ease-in-out"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-in zoom-in-50 duration-200">
              {cartItemsCount}
            </span>
          )}
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-gradient-to-br from-primary to-primary/70 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-200">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-white font-extrabold">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 animate-in slide-in-from-right-5 duration-200">
          <DropdownMenuLabel className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-medium">{user?.userName || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => navigate("/shop/account")} 
            className="cursor-pointer hover:bg-primary/10 transition-colors"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-0 sm:px-2 md:px-4">
        <Link to="/shop/home" className="flex items-center gap-2 group pl-4 md:pl-0">
          <div className="bg-primary text-white p-2 rounded-md transition-transform group-hover:scale-110 duration-300">
            <HousePlug className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg group-hover:text-primary transition-colors">Trendify Fashion</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden mr-4">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <div className="flex flex-col h-full">
              <Link to="/shop/home" className="flex items-center gap-2 mb-6">
                <div className="bg-primary text-white p-2 rounded-md">
                  <HousePlug className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg">Trendify Fashion</span>
              </Link>
              <div className="relative mb-6">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pr-8"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/shop/search?query=${e.target.value}`);
                    }
                  }}
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
              </div>
              <MenuItems />
              <div className="mt-auto pt-6">
                <HeaderRightContent />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block pr-4 md:pr-0">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
