import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock < 10;
  const isOnSale = product?.salePrice > 0;

  return (
    <Card 
      className="w-full max-w-sm mx-auto group overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <div className="relative h-[300px] overflow-hidden">
            <img
              src={product?.image}
              alt={product?.title}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-10' : ''}`}></div>
          </div>
          
          {/* Status badges with improved styling */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isOutOfStock ? (
              <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 shadow-md">
                Out Of Stock
              </Badge>
            ) : isLowStock ? (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 shadow-md">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : isOnSale ? (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 shadow-md">
                Sale
              </Badge>
            ) : null}
            
            {isOnSale && (
              <Badge className="bg-primary hover:bg-primary/90 px-3 py-1 shadow-md">
                {Math.round((1 - product.salePrice / product.price) * 100)}% Off
              </Badge>
            )}
          </div>
          
          {/* Quick action buttons that appear on hover */}
          <div className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'}`}>
            <Button 
              size="icon" 
              variant="secondary"
              className="rounded-full w-9 h-9 bg-white text-gray-700 hover:bg-primary hover:text-white transition-all shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                handleGetProductDetails(product?._id);
              }}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">{product?.title}</h2>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isOnSale ? (
              <>
                <span className="text-lg font-bold text-primary">
                  ${product?.salePrice.toFixed(2)}
                </span>
                <span className="text-sm line-through text-muted-foreground">
                  ${product?.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">
                ${product?.price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="pb-4 px-4">
        {isOutOfStock ? (
          <Button 
            disabled
            className="w-full bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300"
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product?._id, product?.totalStock);
            }}
            className="w-full gap-2 group relative overflow-hidden"
            variant="default"
          >
            <span className="flex items-center gap-2 transition-transform group-hover:-translate-y-10 duration-300">
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </span>
            <span className="absolute flex items-center gap-2 transition-transform translate-y-10 group-hover:translate-y-0 duration-300">
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
