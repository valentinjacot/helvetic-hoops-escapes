import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={logo} alt="HelveticHoops Travel" className="w-24 h-24" />
            <p className="text-sm text-muted-foreground">
              Premium basketball travel experiences from Switzerland to Europe's finest EuroLeague venues.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#games" className="hover:text-primary transition-colors">Upcoming Games</a></li>
              <li><a href="#booking" className="hover:text-primary transition-colors">Book Now</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                info@helvetichoops.ch
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                +41 79 123 45 67
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Zurich, Switzerland
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Stay updated with the latest packages and exclusive offers!
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HelveticHoops Travel. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;