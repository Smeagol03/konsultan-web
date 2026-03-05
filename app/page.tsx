import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import AnimateIcon from "@/app/components/Animate-icon";
import MethodologySection from "@/app/components/MethodologySection";
import PortfolioSection from "@/app/components/PortfolioSection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] selection:bg-black selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AnimateIcon />
      <MethodologySection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
