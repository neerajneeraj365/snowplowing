import { Shield, Clock, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed and insured for your peace of mind. We take responsibility for our work.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Service",
    description: "Snow doesn't wait, neither do we. Available around the clock for emergency snow removal.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "We stand behind our work with a satisfaction guarantee. If you're not happy, we'll make it right.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Our trained professionals bring years of expertise to every job, big or small.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Trusted by Homeowners & Businesses Since 2009
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              FrostGreenPro has been serving our community with reliable snow plowing and landscaping services for over 15 years. What started as a small family operation has grown into a trusted name in property maintenance.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We believe in honest work, fair pricing, and treating every property like our own. Our team takes pride in delivering exceptional results that exceed expectations, whether it's clearing your driveway after a winter storm or designing your dream garden.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative">
            <div className="bg-linear-to-r  from-sky-500 to-emerald-500 rounded-3xl p-8 md:p-12 text-white shadow-glow">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Why Choose FrostPro?
              </h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl md:text-5xl font-extrabold mb-2">500+</div>
                  <div className="text-white/80">Satisfied Clients</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-extrabold mb-2">15+</div>
                  <div className="text-white/80">Years in Business</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-extrabold mb-2">24/7</div>
                  <div className="text-white/80">Emergency Response</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-extrabold mb-2">100%</div>
                  <div className="text-white/80">Satisfaction Rate</div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-primary-foreground/20">
                <blockquote className="text-lg italic text-white/90">
                  "FrostGreenPro saved us during last winter's blizzard. They cleared our parking lot before we even opened. Highly recommend!"
                </blockquote>
                <p className="mt-4 font-semibold text-white">— Sarah M., Business Owner</p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
