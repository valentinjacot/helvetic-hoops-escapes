import Hero from "@/components/Hero";
import GamesSection from "@/components/GamesSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <GamesSection />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Index;