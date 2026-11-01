import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Does Pilotd replace legal or tax professionals?",
    a: "Pilotd is an operational intelligence layer. It surfaces obligations, timelines, and risks, then coordinates execution. Professional advisors remain part of final filing and legal review workflows."
  },
  {
    q: "Can Scottie handle multiple jurisdictions at once?",
    a: "Yes. Scottie is designed for property portfolios that span countries, states, and tax regimes. It can summarize obligations by property or jurisdiction in one view."
  },
  {
    q: "How does bank dormancy monitoring work?",
    a: "Pilotd tracks account inactivity windows, balance thresholds, and payment dependencies. Scottie issues proactive alerts before dormancy risks impact operations."
  },
  {
    q: "Can I connect smart home systems?",
    a: "Yes. The platform includes integration placeholders for camera, lock, HVAC, and IoT telemetry so operations and compliance can be monitored together."
  }
];

export function FAQAccordion() {
  return (
    <section className="container-shell py-20" id="faq">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-medium text-primary">FAQ</p>
        <h2 className="mt-3 text-center font-[var(--font-space-grotesk)] text-3xl font-semibold">Common questions from global owners</h2>
        <Accordion type="single" collapsible className="mt-10 rounded-xl border px-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`item-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
