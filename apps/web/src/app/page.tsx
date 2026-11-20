import { CommunitySection } from '@/components/portfolio/community-section';
import { ContactFooter } from '@/components/portfolio/contact-footer';
import { CraftSection } from '@/components/portfolio/craft-section';
import { Hero } from '@/components/portfolio/hero';
import { Navbar } from '@/components/portfolio/navbar';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { JourneySection, ToolkitSection } from '@/components/portfolio/toolkit-timeline';

export default function PortfolioHomePage() {
  return (
    <div className="relative min-h-dvh">
      {/* Subtle architectural CAD grid + quiet ambient radial top glow */}
      <div
        aria-hidden="true"
        className="void-draft-grid pointer-events-none fixed inset-0 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[420px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, var(--void-glow), transparent 100%)',
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ProjectsSection />
          <CraftSection />
          <ToolkitSection />
          <CommunitySection />
          <JourneySection />
        </main>
        <ContactFooter />
      </div>
    </div>
  );
}
