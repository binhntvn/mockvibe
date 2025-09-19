import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import GoHomeButton from "@/components/GoHomeButton";
import { User } from "@supabase/supabase-js";

type Product = Database['public']['Tables']['products']['Row'];

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: productData, error: productError } = await supabase.from('products').select('*');
      if (productError) throw productError;
      setProducts(productData);

      const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
      if (userError) throw userError;
      setUsers(users);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const { error } = await supabase.from('products').update(editingProduct).eq('id', editingProduct.id);
      if (error) throw error;
      setEditingProduct(null);
      fetchData();
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const { name, description, price, image_url, stock_quantity } = editingProduct;
      const { error } = await supabase.from('products').insert({ name, description, price, image_url, stock_quantity });
      if (error) throw error;
      setEditingProduct(null);
      fetchData();
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto py-8">
      <GoHomeButton />
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {editingProduct ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct.id ? 'Edit Product' : 'Create Product'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingProduct.id ? handleUpdateProduct : handleCreateProduct}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={editingProduct.description || ''} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input id="image_url" value={editingProduct.image_url || ''} onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input id="stock_quantity" type="number" value={editingProduct.stock_quantity} onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) })} />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
                <Button type="submit">{editingProduct.id ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Button onClick={() => setEditingProduct({ id: 0, name: '', description: '', price: 0, image_url: '', stock_quantity: 0, created_at: '' })}>Create New Product</Button>
          <div className="mt-4 space-y-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;