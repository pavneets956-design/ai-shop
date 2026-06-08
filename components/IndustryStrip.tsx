// Infinite marquee of industries served — CSS-only.
const industries = [
  "Contractors",
  "Real Estate",
  "Restaurants",
  "Clinics",
  "Salons",
  "E-commerce",
  "Creators",
  "Coaches",
  "Law Firms",
  "Dentists",
  "Gyms",
  "Startups",
  "Plumbers",
  "Electricians",
  "Auto Shops",
  "Accountants",
];

export default function IndustryStrip() {
  return (
    <div className="mask-fade-x relative overflow-hidden py-2">
      <div className="flex w-max animate-marquee gap-3">
        {[...industries, ...industries].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap rounded-full border border-ink/10 bg-ink/[0.03] px-5 py-2 text-sm text-ink/55"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
