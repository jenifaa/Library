
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white ">
    
      <div className="w-11/12 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold font mb-2">WEBShelf</h2>
              <p className="text-gray-300 text-lg">Your Favorite Bookhell!</p>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Subscribe to our newsletter</h3>
              <div className="flex gap-2 max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="bg-white text-gray-900 hover:bg-gray-200">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-6">WHAT'S NEW</h3>
            <div className="space-y-6">
            
              <div className="space-y-2 mb-8">
                <h4 className="font-medium">The Story About Me</h4>
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 line-through">$12.00</span>
                  <span className="text-white font-semibold">$10.00</span>
                </div>
              </div>

           
              <div className="space-y-2">
                <h4 className="font-medium">Design of the 20th Century</h4>
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">$10.99</span>
                  <span className="text-gray-300">–</span>
                  <span className="text-white font-semibold">$20.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* LINKS & CONTACT Section */}
          <div className="space-y-8">
            {/* LINKS */}
            <div>
              <h3 className="text-lg font-semibold mb-4">LINKS</h3>
              <nav className="space-y-2">
                {["Home", "About Us", "Our Team", "Events", "Store", "Contacts"].map((link) => (
                  <Link
                    key={link}
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </nav>
            </div>

            {/* GET IN TOUCH */}
            <div>
              <h3 className="text-lg font-semibold mb-4">GET IN TOUCH</h3>
              <div className="space-y-2 text-gray-300">
                <p className="font-medium">Germany —</p>
                <p>785 15h Street, Office 478</p>
                <p>Berlin, De 81566</p>
                <p>info@email.com</p>
                <p>+1 840 841 25 69</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Preside Chat</span>
          </div>
          
          <div className="text-gray-300 text-sm">
            AnconaTheme © 2025. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}