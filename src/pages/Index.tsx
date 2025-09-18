import Footer from "@/components/Footer";
import FloatingMenu from "@/components/FloatingMenu";
import ProductGrid from "@/components/ProductGrid";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            SoleMate
          </Link>
          <nav className="space-x-4">
            {user ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to SoleMate</h1>
          <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
          <ProductGrid />
        </div>
      </main>
      <Footer />
      <FloatingMenu />
    </div>
  );
};

export default Index;
