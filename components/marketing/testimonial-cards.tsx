import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Elena Moura",
    role: "Owner, Lisbon + Miami Portfolio",
    quote:
      "Pilotd is the first platform that gives me cross-border compliance visibility without hiring separate teams in each jurisdiction."
  },
  {
    name: "Rahul Desai",
    role: "Diaspora Investor",
    quote:
      "Scottie helped me catch a dormancy issue in time and prevented a payment freeze on a key operating account."
  },
  {
    name: "Michael Ward",
    role: "Short-Term Rental Operator",
    quote:
      "I start every day with Scottie's brief. It compresses legal, financial, and property operations into one clear action list."
  }
];

export function TestimonialCards() {
  return (
    <section className="container-shell py-20">
      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="border-white/10 bg-card/70">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">“{testimonial.quote}”</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
