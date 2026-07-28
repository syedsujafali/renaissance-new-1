export const BRAND = {
  name: "Renaissance Meetings & Special Events",
  shortName: "Renaissance",
  tagline: "Where Creativity Begins",
  phone: "(212) 561-8955",
  email: "info@renaissanceevents.com",
  address: "822 Avenue of the Americas, Suite 4, New York, NY 10001",
  years: 30,
} as const;

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Get in Touch" },
] as const;

export const ABOUT_COPY = {
  eyebrow: "Est. over three decades",
  title: "Crafting brand experiences that endure",
  body: `For three decades, Renaissance Meetings & Special Events has been a trusted partner for global brands, Fortune 500 companies, associations, Sports, non-profits, and visionary leaders seeking to create moments that transcend the ordinary.`,
  body2: `From intimate executive gatherings to large-scale productions reaching thousands, we bring expertise, creativity, and precision to every event.`,
  stats: [
    { value: "30+", label: "Years of craft" },
    { value: "500+", label: "Signature events" },
    { value: "F500", label: "Trusted by leaders" },
  ],
} as const;

export const SERVICES = [
  {
    number: "01",
    title: "Meetings & Conferences",
    description:
      "Strategic gatherings designed with precision — from intimate executive summits to multi-day global conferences.",
  },
  {
    number: "02",
    title: "Special Events",
    description:
      "One-of-a-kind experiences that transform brand narratives into living, breathing moments of connection.",
  },
  {
    number: "03",
    title: "Fundraising & Galas",
    description:
      "Elegant philanthropic evenings that inspire generosity and leave lasting impressions on every guest.",
  },
  {
    number: "04",
    title: "Sponsorship Development",
    description:
      "Partnership strategies that align brands, amplify reach, and deliver measurable mutual value.",
  },
] as const;

// High-quality curated event photography (landscape, premium)
export const IMAGES = {
  hero: "/a1.jpeg",
  heroAlt: "/a2.JPEG",
  about: "/b1.jpeg",
  aboutSecondary: "/b2.jpeg",
  atmosphere: "/c1.jpg",
} as const;

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  imageSecondary?: string;
  layout: "full" | "split" | "stacked" | "wide";
};

export const PROJECTS: Project[] = [
  {
    id: "gala-lumiere",
    title: "Gala Lumière",
    category: "Fundraising Gala",
    year: "2024",
    description:
      "An intimate black-tie evening for a global nonprofit — candlelit tables, orchestral arrivals, and a narrative arc that raised record commitments.",
    image: "/a1.jpeg",
    imageSecondary: "/a3.JPEG",
    layout: "full",
  },
  {
    id: "summit-north",
    title: "Summit North",
    category: "Executive Conference",
    year: "2024",
    description:
      "A two-day leadership summit for Fortune 500 executives — precision staging, immersive content moments, and hospitality choreographed to the minute.",
    image: "/b1.jpeg",
    imageSecondary: "/b2.jpeg",
    layout: "split",
  },
  {
    id: "bloom-reception",
    title: "Bloom Reception",
    category: "Brand Experience",
    year: "2023",
    description:
      "A floral-forward reception celebrating a landmark anniversary — layered environments, custom scent design, and editorial table landscapes.",
    image: "/e2.jpeg",
    imageSecondary: "/f2.jpeg",
    layout: "stacked",
  },
  {
    id: "midnight-assembly",
    title: "Midnight Assembly",
    category: "Special Event",
    year: "2023",
    description:
      "An after-dark gathering for a sports organization — architectural lighting, sculptural seating, and a sequence of reveal moments.",
    image: "/f5.jpeg",
    imageSecondary: "/n3.jpeg",
    layout: "wide",
  },
  {
    id: "forum-stage",
    title: "The Forum Stage",
    category: "Product Launch",
    year: "2023",
    description:
      "A cinematic product reveal for a global brand — stage architecture, motion content, and a guest journey designed as a single continuous story.",
    image: "/e1.jpeg",
    imageSecondary: "/e2.jpeg",
    layout: "split",
  },
  {
    id: "heritage-ballroom",
    title: "Heritage Ballroom",
    category: "Association Dinner",
    year: "2022",
    description:
      "A classic ballroom transformed for an association milestone — refined table craft, ceremonial pacing, and unforgettable guest hospitality.",
    image: "/f2.jpeg",
    imageSecondary: "/n1.JPEG",
    layout: "full",
  },
];

export const CLIENTS = [
  "Fortune 500",
  "Global Brands",
  "Associations",
  "Sports Organizations",
  "Nonprofits",
  "Executive Leaders",
] as const;
