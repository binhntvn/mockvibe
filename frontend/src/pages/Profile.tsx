import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoHomeButton from "@/components/GoHomeButton";

type Order = Database['public']['Tables']['orders']['Row'];

const Profile = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !token) return;
      try {
        const response = await fetch('http://localhost:8000/orders/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user, token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto py-8">
      <GoHomeButton />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Profile Page</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {user && (
        <div>
          <p className="mb-4">Email: {user.email}</p>
          <h2 className="text-2xl font-bold mb-4">My Orders</h2>
          {loading && <div>Loading orders...</div>}
          {error && <div className="text-red-500">Error fetching orders: {error}</div>}
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle>Order #{order.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Status: {order.status}</p>
                  <p>Total: ${order.total_amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;