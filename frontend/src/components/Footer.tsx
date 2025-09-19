const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">SoleMate</h2>
            <p>Your one-stop shop for the best shoes online.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/#products" className="hover:underline">Products</a></li>
              <li><a href="/cart" className="hover:underline">Cart</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="font-bold mb-2">Contact Us</h3>
            <p>Email: support@solemate.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
        <div className="text-center mt-8 pt-4 border-t border-gray-700">
          <p>&copy; 2024 SoleMate. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;