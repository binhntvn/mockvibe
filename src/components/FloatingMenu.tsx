import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import Cart from "./Cart";

const FloatingMenu = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shadow-lg">
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shadow-lg mt-2">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-4">
            <Link to="/">Home</Link>
            <Link to="/#features">Features</Link>
            <Link to="/#products">Products</Link>
            <Link to="/#trust">Trust</Link>
            <Link to="/#contact">Contact</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FloatingMenu;