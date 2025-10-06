import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Borrow", path: "/borrow-summary" },
    { name: "Add Books", path: "/create-book" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg  shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-12 flex justify-between items-center h-16">
       
        <Link to="/" className="text-xl font-bold text-shadow-red-950 flex items-center">
         <img className="w-12 h-12 mr-2" src="https://i.ibb.co.com/whW5RJzm/logo.png" alt="" />
          <h1 className="font">WebShelf</h1>
        </Link>

    
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm  transition ${
                  isActive ? "text-black font-bold" : "text-black hover:font-bold"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Button variant="outline" className="ml-4">
            Login
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="py-2 text-gray-700 hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <Button variant="outline" className="mt-2">
              Login
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
