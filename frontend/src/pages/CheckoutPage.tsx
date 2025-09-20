import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoHomeButton from "@/components/GoHomeButton";

const CheckoutPage = () => {
  const { cart, clearCart, total } = useCart();
  const { user, token } = useAuth();
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) {
      setError("You must be logged in to place an order.");
      return;
    }

    try {
      console.log("Placing order with cart:", cart);
      const orderData = {
        total_amount: total,
        shipping_address: shippingAddress,
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }))
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to place order');
      }

      clearCart();
      navigate('/profile');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <GoHomeButton />
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePlaceOrder}>
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="street">Street</Label>
                <Input id="street" value={shippingAddress.street} onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="state">State</Label>
                <Input id="state" value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="zip">Zip Code</Label>
                <Input id="zip" value={shippingAddress.zip} onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <Button type="submit" className="w-full mt-4">Place Order</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;