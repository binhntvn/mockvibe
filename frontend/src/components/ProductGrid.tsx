import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Database } from "@/integrations/supabase/types";
import { useCart } from "@/contexts/CartContext";

type Product = Database['public']['Tables']['products']['Row'];

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          console.error("Error fetching products:", error);
          setError(error.message);
        } else {
          console.log("Fetched products:", data);
          setProducts(data);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="w-full h-48 object-cover" />
            <p className="mt-2">{product.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="font-bold">${product.price}</p>
            <Button onClick={() => addToCart(product, 1)}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;