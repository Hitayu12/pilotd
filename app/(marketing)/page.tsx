import { ComparisonTableSection } from "@/components/marketing/comparison-table";
import { DemoScenarioSection } from "@/components/marketing/demo-scenario";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { FooterCTA } from "@/components/marketing/footer-cta";
import { HeroSection } from "@/components/marketing/hero";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { ProblemSection } from "@/components/marketing/problem-section";
import { TestimonialCards } from "@/components/marketing/testimonial-cards";
import { UseCasesSection } from "@/components/marketing/use-cases";

export default function MarketingPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeatureGrid />
      <DemoScenarioSection />
      <ComparisonTableSection />
      <UseCasesSection />
      <TestimonialCards />
      <PricingCards />
      <FAQAccordion />
      <FooterCTA />
    </>
  );
}
