import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import  Link  from "next/link";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <span className="inline-block text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Contact us today for a free estimate. We're here to answer your questions and help you maintain a beautiful, safe property year-round.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Phone</h3>
                  <a href="tel:5551234567" className="text-muted-foreground hover:text-primary transition-colors">
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Email</h3>
                  <a href="mailto:info@frostgreenpro.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@frostgreenpro.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    123 Winter Lane<br />
                    Snowville, ST 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Mon - Fri: 7:00 AM - 6:00 PM<br />
                    Sat: 8:00 AM - 4:00 PM<br />
                    <span className="text-primary font-medium">24/7 Emergency Snow Service</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="flex items-center">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Book Your Service Today
              </h3>
              <p className="text-black mb-8 leading-relaxed">
                Ready to experience professional snow plowing and landscaping? Book your service online in just a few minutes. Secure payment and instant confirmation.
              </p>

              <div className="space-y-4">
                <Link href="/book">
                  <Button variant="snow" size="lg" className="w-full">
                    Book Online Now
                  </Button>
                </Link>


                
                <p className="text-center text-sm  text-muted-foreground mt-2">
                  or call us at 
                    {" "}
                    <Link href="tel:5551234567" className="text-black hover:text-emerald-500 cursor-pointer">
                        
                         (555) 123-4567
                      </Link>
                    
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-semibold text-foreground mb-4">Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {["Toronto", "Markham", "Vaughan", "Richmond Hill", "Aurora", "Newmarket"].map((area) => (
                    <span key={area} className="px-3 py-1 bg-zinc-100 rounded-full text-sm text-emerald-700">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
