import Cart from "@/components/Cart";
import GoHomeButton from "@/components/GoHomeButton";

const CartPage = () => {
  return (
    <div className="container mx-auto py-8">
      <GoHomeButton />
      <Cart />
    </div>
  );
};

export default CartPage;