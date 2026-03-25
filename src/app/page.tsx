import Hero from "@/components/Hero";
import PremiumFeatures from "@/components/PremiumFeatures";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Hero />
      <PremiumFeatures />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
