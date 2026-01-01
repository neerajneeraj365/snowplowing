import  Link  from "next/link";
import { Snowflake, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                FrostGreen<span className="text-primary">Pro</span>
              </span>
            </Link>
            <p className="text-background/70 max-w-md leading-relaxed">
              Your trusted partner for professional snow plowing and landscaping services. 
              We keep your property pristine year-round, from winter snow removal to summer lawn care.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
        
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/#services" className="text-zinc-300/70 hover:text-zinc-200 transition-colors">Services</a></li>
              <li><a href="/#about" className="text-zinc-300/70 hover:text-zinc-200 transition-colors">About Us</a></li>
              <li><a href="/#contact" className="text-zinc-300/70 hover:text-zinc-200 transition-colors">Contact</a></li>
              <li><Link href="/book" className="text-zinc-300/70 hover:text-zinc-200 transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
            
              <li >
            <Link href="tel:5551234567" className="flex items-center gap-3 text-zinc-300/70 hover:text-zinc-200 transition-colors">
                <Phone className="w-5 h-5" />
                 (555) 123-4567
              </Link>
                
              </li>
              <li className="flex items-center gap-3 text-background/70">
              <Link href="mailto:info@frostgreenpro.com" className="flex items-center gap-3 text-zinc-300/70 hover:text-zinc-200 transition-colors">
              
                <Mail className="w-5 h-5" />
                info@frostgreenpro.com
              </Link>
                
              </li>
              <li className="flex items-start gap-3 text-background/70">
              <Link href="#" className="flex items-center gap-3 text-zinc-300/70 hover:text-zinc-200 transition-colors">
              
              <MapPin className="w-5 h-5" />
              123 Winter Lane<br />Snowville, ST 12345
              </Link>
                
                
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-300/70 text-sm">
            © {new Date().getFullYear()} FrostGreenPro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-zinc-300/70 hover:text-zinc-200 transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-300/70 hover:text-zinc-200 transition-colors">Terms of Service</a>
            <a href="https://codewithnik.vercel.app" className="text-zinc-300/70 hover:text-zinc-200 transition-colors">Created by Neeraj</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
