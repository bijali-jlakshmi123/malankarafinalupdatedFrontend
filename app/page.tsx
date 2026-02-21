import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import RoomsSuitesSlider from "@/components/RoomsSuitesSlider";
import DiningSlider from "@/components/DiningSlider";
import ExperienceSlider from "@/components/ExperienceSlider";
import FacilitiesSlider from "@/components/FacilitiesSlider";
import Footer from "@/components/Footer";
import MetaSEO from "@/components/MetaSEO";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <MetaSEO slug="home" />
      <Header />
      <HeroSlider />
      <RoomsSuitesSlider />
      <DiningSlider />
      <ExperienceSlider />
      <FacilitiesSlider />

      {/* From Home to Destination Section (Exact as Our Story Page Footer Area) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-prata text-secondary mb-10 font-medium">
              From Home to Destination
            </h2>
            <div className="space-y-8 text-text text-lg md:text-xl font-light leading-relaxed">
              <p>
                With care, patience, and respect for the land, the family slowly
                transformed their cherished home into a welcoming lakeside
                retreat. What was once a simple four-bedroom house evolved into
                a thoughtfully designed resort, while preserving the soul of the
                place — openness, calm, and connection to nature.
              </p>
              <p>
                Every room, balcony, and shared space was created to reflect the
                same feeling the family once enjoyed — comfort without rush,
                beauty without excess, and luxury that feels warm rather than
                formal. Today, the resort stands as a continuation of that story
                —{" "}
                <span className="font-medium text-secondary">
                  not a replacement of the past, but an extension of it.
                </span>
              </p>
              <p>
                More than a place to stay, Malankara Palace is a place to feel
                at ease. Whether you arrive for a quiet holiday, a family
                gathering, a celebration, or a special milestone, you are
                welcomed with the same warmth that once filled this home.
              </p>
              <div className="pt-8 space-y-4">
                <p className="font-medium text-secondary uppercase tracking-wide text-base">
                  We invite you to slow down, breathe deeply, and create your
                  own memories by the lake.
                </p>
                <p className="text-secondary font-medium italic">
                  Welcome to our story. Welcome to Malankara Palace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
