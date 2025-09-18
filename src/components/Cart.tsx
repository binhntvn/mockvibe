import { useCart } from "@/contexts/CartContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold">{item.product.name}</p>
                  <p>${item.product.price}</p>
                </div>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                    className="w-16"
                  />
                  <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.product.id)} className="ml-2">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button onClick={clearCart} variant="outline" className="w-full mt-4">
                Clear Cart
              </Button>
              <Button onClick={() => window.location.href = '/checkout'} className="w-full mt-2">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Cart;