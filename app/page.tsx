import HeroSection from "@/components/globals/Homepage/Hero";
import ServicesSection from "@/components/globals/Homepage/Services";
import AboutSection from "@/components/globals/Homepage/About";
import ContactSection from "@/components/globals/Homepage/Contact";
import FooterSection from "@/components/globals/Homepage/Footer";
import Header from "@/components/globals/Homepage/Header";
export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
