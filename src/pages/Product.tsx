import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Product = Database['public']['Tables']['products']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [newReview, setNewReview] = useState({ rating: 5, review_text: '' });

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      if (!id) return;
      try {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', Number(id))
          .single();
        if (productError) throw productError;
        setProduct(productData);

        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', Number(id));
        if (reviewsError) throw reviewsError;
        setReviews(reviewsData);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !product) return;

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: product.id,
          user_id: user.id,
          rating: newReview.rating,
          review_text: newReview.review_text,
        })
        .select()
        .single();

      if (error) throw error;
      setReviews([...reviews, data]);
      setNewReview({ rating: 5, review_text: '' });
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error: {error || 'Product not found'}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="w-full h-96 object-cover" />
          <p className="mt-4">{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="font-bold">${product.price}</p>
          <Button onClick={() => addToCart(product, 1)}>Add to Cart</Button>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.map((review) => (
          <Card key={review.id} className="mb-4">
            <CardHeader>
              <CardTitle>Rating: {review.rating}/5</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{review.review_text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {user && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rating">Rating</Label>
                <select id="rating" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })} className="w-full p-2 border rounded">
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="review_text">Review</Label>
                <Textarea id="review_text" value={newReview.review_text} onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })} />
              </div>
              <Button type="submit">Submit Review</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Product;