import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import RoomsSuitesSlider from "@/components/RoomsSuitesSlider";
import DiningSlider from "@/components/DiningSlider";
import ExperienceSlider from "@/components/ExperienceSlider";
import FacilitiesSlider from "@/components/FacilitiesSlider";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <HeroSlider />
      <RoomsSuitesSlider />
      <DiningSlider />
      <ExperienceSlider />
      <FacilitiesSlider />
      <Footer />
    </main>
  );
}
