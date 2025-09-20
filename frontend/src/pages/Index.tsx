import Footer from "@/components/Footer";
import FloatingMenu from "@/components/FloatingMenu";
import ProductGrid from "@/components/ProductGrid";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, Truck, RotateCw, Lock, User } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500/10 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            SoleMate
          </Link>
          <nav className="space-x-4">
            {user ? (
              <Link to="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
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
        <section id="home" className="py-20 text-center">
          <h1 className="text-4xl font-bold">Welcome to SoleMate</h1>
          <p className="text-lg mt-2">Your one-stop shop for the best shoes online.</p>
          <div className="flex justify-center items-center space-x-8 mt-8">
            <img src="https://logo.clearbit.com/nike.com" alt="Nike" className="h-12" />
            <img src="https://logo.clearbit.com/adidas.com" alt="Adidas" className="h-12" />
            <img src="https://logo.clearbit.com/puma.com" alt="Puma" className="h-12" />
            <img src="https://logo.clearbit.com/reebok.com" alt="Reebok" className="h-12" />
          </div>
        </section>
        <section id="products" className="py-20 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
            <ProductGrid />
          </div>
        </section>
        <section id="features" className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <Truck className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Fast Shipping</h3>
                <p>Get your new shoes delivered to your door in no time.</p>
              </div>
              <div className="flex flex-col items-center">
                <RotateCw className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Easy Returns</h3>
                <p>Not the right fit? No problem. We offer hassle-free returns.</p>
              </div>
              <div className="flex flex-col items-center">
                <Lock className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
                <p>Your payment information is safe and secure with us.</p>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Guaranteed Quality</h3>
                <p>We only sell high-quality shoes from trusted brands.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="trust" className="py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Trusted by Millions</h2>
            <p className="mb-8">We are committed to providing a secure and trustworthy shopping experience.</p>
            <div className="flex justify-center items-center space-x-8">
              <img src="https://logo.clearbit.com/norton.com" alt="Norton Secured" className="h-12" />
              <img src="https://logo.clearbit.com/mcafee.com" alt="McAfee Secure" className="h-12" />
              <img src="https://logo.clearbit.com/paypal.com" alt="PayPal" className="h-12" />
              <img src="https://logo.clearbit.com/visa.com" alt="Visa" className="h-12" />
              <img src="https://logo.clearbit.com/mastercard.com" alt="Mastercard" className="h-12" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
