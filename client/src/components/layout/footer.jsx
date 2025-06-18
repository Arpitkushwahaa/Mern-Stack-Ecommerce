import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  HelpCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HousePlug } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="relative mb-16 p-8 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
          <div className="absolute -bottom-16 -right-16">
            <Sparkles size={200} className="text-primary/10" />
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 max-w-md">
              <h3 className="text-2xl font-bold">Join Our Style Newsletter</h3>
              <p className="text-gray-300 mt-2">Get exclusive offers, trend updates and style inspiration delivered to your inbox</p>
            </div>
            <div className="flex w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 focus:border-white text-white w-full pr-12 rounded-l-md rounded-r-none h-12"
                />
                <Button className="absolute right-0 top-0 h-12 bg-primary hover:bg-primary/90 text-white rounded-l-none px-4">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-primary text-white p-2 rounded-md">
                <HousePlug className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl">Trendify Fashion</span>
            </div>
            <p className="text-gray-300 mb-6">
              Your premier destination for curated fashion that makes a statement. Discover quality pieces that blend style, comfort, and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="h-5 w-1 bg-primary rounded-full"></span>
              Shop Categories
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/shop/listing?category=men", label: "Men's Fashion" },
                { path: "/shop/listing?category=women", label: "Women's Fashion" },
                { path: "/shop/listing?category=kids", label: "Kids' Fashion" },
                { path: "/shop/listing?category=accessories", label: "Accessories" },
                { path: "/shop/listing?category=footwear", label: "Footwear" }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="flex items-center group text-gray-300 hover:text-white transition-all">
                    <span className="w-0 group-hover:w-2 h-1 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="h-5 w-1 bg-primary rounded-full"></span>
              Customer Support
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/contact", label: "Contact Us" },
                { path: "/faq", label: "FAQs" },
                { path: "/shipping", label: "Shipping Info" },
                { path: "/returns", label: "Returns & Exchanges" },
                { path: "/terms", label: "Terms & Conditions" },
                { path: "/privacy", label: "Privacy Policy" }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="flex items-center group text-gray-300 hover:text-white transition-all">
                    <span className="w-0 group-hover:w-2 h-1 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="h-5 w-1 bg-primary rounded-full"></span>
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  123 Fashion Street, Style City, 
                  <br />
                  FS 12345, Country
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                <a href="mailto:support@fashionstore.com" className="text-gray-300 hover:text-white transition-colors">
                  support@trendify.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-700 pt-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: CreditCard,
                title: "Secure Payment",
                desc: "All major cards accepted"
              },
              {
                icon: ShieldCheck,
                title: "Shop with Confidence",
                desc: "Our buyer protection covers you"
              },
              {
                icon: Truck,
                title: "Worldwide Delivery",
                desc: "Fast shipping to over 200 countries"
              },
              {
                icon: HelpCircle,
                title: "24/7 Support",
                desc: "Round-the-clock assistance"
              }
            ].map((item, index) => (
              <div className="flex flex-col items-center group" key={index}>
                <div className="bg-gray-800 p-3 rounded-full mb-4 group-hover:bg-primary transition-colors duration-300">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h5 className="font-medium text-lg mb-1">{item.title}</h5>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Trendify Fashion. All rights reserved.
          </p>
          <div className="flex items-center space-x-3">
            {["Visa", "MasterCard", "PayPal", "American Express"].map((payment, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center justify-center h-8"
              >
                <span className="text-sm text-gray-300">{payment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
