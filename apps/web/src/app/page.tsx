import { StickySideRails } from '@/components/portfolio/bench-props';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { CommunitySection } from '@/components/portfolio/community-section';
import { ContactFooter } from '@/components/portfolio/contact-footer';
import { CraftSection } from '@/components/portfolio/craft-section';
import { CuttingMatBackdrop } from '@/components/portfolio/cutting-mat-overlay';
import { Hero } from '@/components/portfolio/hero';
import { ChapterProgressBar } from '@/components/portfolio/motion-primitives';
import { Navbar } from '@/components/portfolio/navbar';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { JourneySection, ToolkitSection } from '@/components/portfolio/toolkit-timeline';

export default function PortfolioHomePage() {
  return (
    <div className="relative min-h-dvh">
      <ChapterProgressBar />
      <CuttingMatBackdrop />
      <StickySideRails />

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

      <CommandPalette />
    </div>
  );
}
