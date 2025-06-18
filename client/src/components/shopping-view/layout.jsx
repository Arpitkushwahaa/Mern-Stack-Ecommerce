import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import { useEffect } from "react";
import Footer from "../layout/footer";

function ShoppingLayout() {
  // Smooth scroll to top on route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Common header with improved styling */}
      <ShoppingHeader />
      
      {/* Main content with smooth page transitions */}
      <main className="flex-grow flex flex-col w-full animate-in fade-in duration-500">
        <Outlet />
      </main>
      
      {/* Common footer */}
      <Footer />
    </div>
  );
}

export default ShoppingLayout;
