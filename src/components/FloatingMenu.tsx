import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import Cart from "./Cart";

const FloatingMenu = () => {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shadow-lg">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="/#home">Home</a>
              <a href="/#features">Features</a>
              <a href="/#products">Products</a>
              <a href="/#trust">Trust</a>
              <a href="/#footer">Contact</a>
              <Link to="/login">Login</Link>
              <Link to="/profile">Profile</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full h-16 w-16 shadow-lg bg-blue-500 hover:bg-blue-600">
              <ShoppingCart className="h-8 w-8 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default FloatingMenu;