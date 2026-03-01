import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoomsSuitesSlider from "@/components/RoomsSuitesSlider";
import RoomsList from "@/components/RoomsList";

export default function RoomsPage() {
  return (
    <main className="relative min-h-screen">
      <Header transparent />
      <RoomsSuitesSlider isHero={true} className="h-[60vh] md:h-[70vh]" />
      <RoomsList />
      <Footer />
    </main>
  );
}
