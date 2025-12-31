import  Link  from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Snowflake, TreeDeciduous } from "lucide-react";
import heroImage from "@/public/hero-snow.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${'/hero-snow.jpg'})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Snowflake className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Winter & Year-Round Services</span>
            <TreeDeciduous className="w-4 h-4 text-green-500" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight  mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Professional Snow Plowing & Landscaping
            <span className="block text-gradient bg-linear-to-r from-sky-500 to-emerald-500 text-transparent bg-clip-text">You Can Trust</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Keep your property safe and beautiful year-round. From winter storm response to summer lawn care, we've got you covered with reliable, professional service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/book">
              <Button variant="snow" size="default" className="w-full sm:w-auto">
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
              <Button variant="link" size="default" className="text-white hover:text-emerald-500 cursor-pointer" asChild>
            <Link href="tel:5551234567">
                <Phone className="w-5 h-5" />
                 (555) 123-4567
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-white/60">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/60">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/60">Emergency Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
