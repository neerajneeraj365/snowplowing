import { Snowflake, TreeDeciduous, Shovel, Leaf, TreePine, Droplets } from "lucide-react";
import snowService from "@/public/snow-service.jpg";
import landscapingService from "@/public/landscaping-service.jpg";
import lawnService from "@/public/lawn-service.jpg";
import Image from "next/image";
import iceManage from "@/public/ice-manage.jpg";
import waterSystem from "@/public/water-system.jpg";
import treeCare from "@/public/tree-care.jpg";


const services = [
  {
    icon: Snowflake,
    title: "Snow Plowing",
    description: "Reliable residential and commercial snow removal. We respond quickly to keep your driveways, parking lots, and walkways clear and safe.",
    image: snowService,
    color: "winter",
  },
  {
    icon: TreeDeciduous,
    title: "Landscaping Design",
    description: "Transform your outdoor space with custom landscape design. From gardens to hardscaping, we create beautiful, functional outdoor environments.",
    image: landscapingService,
    color: "forest",
  },
  {
    icon: Leaf,
    title: "Lawn Maintenance",
    description: "Keep your lawn looking its best with regular mowing, edging, fertilization, and weed control. Comprehensive care for a healthy, green lawn.",
    image: lawnService,
    color: "forest",
  },
  {
    icon: Shovel,
    title: "Ice Management",
    description: "Salt and sand application to prevent ice buildup. Keep walkways and driveways safe for your family, employees, and visitors.",
    color: "winter",
    image: iceManage,
  },
  {
    icon: TreePine,
    title: "Tree & Shrub Care",
    description: "Professional pruning, trimming, and removal services. We keep your trees healthy and your property looking manicured.",
    color: "forest",
    image: treeCare,
  },
  {
    icon: Droplets,
    title: "Irrigation Systems",
    description: "Installation, maintenance, and winterization of irrigation systems. Ensure your landscape stays hydrated efficiently.",
    color: "winter",
    image: waterSystem,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Year-Round Property Care
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From winter snow removal to summer landscaping, we provide comprehensive services to keep your property pristine every season.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.image ? (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center ${service.color === 'winter' ? 'bg-blue-500' : 'bg-green-700'}`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              ) : (
                <div className={`h-32 flex items-center justify-center ${service.color === 'winter' ? 'bg-blue-500/10' : 'bg-green-700/10'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${service.color === 'winter' ? 'bg-blue-500' : 'bg-green-700'}`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
