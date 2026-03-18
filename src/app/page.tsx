import HeroSequence from "@/components/HeroSequence";
import ArchitectureLayers from "@/components/ArchitectureLayers";
import MechanicalCardDeck from "@/components/MechanicalCardDeck";
import KineticCarousel from "@/components/KineticCarousel";
import FooterCTA from "@/components/FooterCTA";
import HolographicGrid from "@/components/HolographicGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative selection:bg-primary-glow">
      <HeroSequence />
      <ArchitectureLayers />
      <MechanicalCardDeck />
      <KineticCarousel />
      <HolographicGrid />
      <FooterCTA />
    </main>
  );
}
