import HeroSection from "@/components/HeroSection";
import MobileAppPromotion from "@/components/MobileAppPromotion";
import PopularCities from "@/components/PopularCities";
import SearchSection from "@/components/SearchSection";
import Testimonials from "@/components/Testimonials";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <SearchSection />
      <PopularCities />
      <MobileAppPromotion />
      <Testimonials />
    </div>
  );
}
