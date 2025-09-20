import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Database } from "@/integrations/supabase/types";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Plus, Minus } from "lucide-react";

type Product = Database['public']['Tables']['products']['Row'];

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductQuantity = (productId: number) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link to={`/product/${product.id}/details`} key={product.id}>
          <Card>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="w-full h-48 object-cover" />
              <p className="mt-2">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="font-bold">${product.price}</p>
              <div className="flex items-center">
                <Button size="icon" className="bg-orange-500 hover:bg-orange-600" onClick={(e) => { e.preventDefault(); updateQuantity(product.id, getProductQuantity(product.id) - 1); }}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" value={getProductQuantity(product.id)} readOnly className="w-16 text-center mx-2" />
                <Button size="icon" className="bg-green-500 hover:bg-green-600" onClick={(e) => { e.preventDefault(); addToCart(product, 1); }}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;