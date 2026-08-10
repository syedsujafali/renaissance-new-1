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
  location: string;
  attendees: string;
  description: string;
  image: string;
  imageSecondary?: string;
  images: string[];
  tags: string[];
  layout: "full" | "split" | "stacked" | "wide";
};

export const PROJECTS: Project[] = [
  {
    id: "clemente-gala",
    title: "Roberto Clemente Foundation Gala",
    category: "Fundraising & Galas",
    year: "2023",
    location: "Pittsburgh, PA",
    attendees: "200+ VIPs & Athletes",
    description:
      "Commemorating the 50th anniversary of Roberto Clemente's Hall of Fame induction, this milestone fundraising gala at the Heinz History Center featured MLB alumni and honored community leaders.",
    image: "/a3.JPEG",
    imageSecondary: "/a4.png",
    images: ["/a3.JPEG", "/a4.png", "/a1.jpeg", "/a2.JPEG"],
    tags: ["Charity Gala", "Event Production", "Sports & Philanthropy"],
    layout: "stacked",
  },
  {
    id: "pj-job-fair",
    title: "Phillips & Jordan Career Fair",
    category: "Corporate Recruitment",
    year: "2015",
    location: "Wharton, TX",
    attendees: "Wharton Civic Center",
    description:
      "A corporate recruitment and hiring event hosted for heavy civil contractor Phillips & Jordan, Inc. at the Wharton Civic Center, connecting prospective candidates with career opportunities in infrastructure construction and field operations.",
    image: "/z1.jpeg",
    imageSecondary: "/z2.jpeg",
    images: ["/z1.jpeg", "/z2.jpeg", "/z3.jpeg", "/z4.jpeg"],
    tags: ["Recruitment Event", "Heavy Civil Construction", "Career Fair"],
    layout: "full",
  },
  {
    id: "nba-100-centennial",
    title: "NBA 100th Centennial Convention",
    category: "Legal Conferences & Galas",
    year: "2025",
    location: "Chicago, IL",
    attendees: "Legal Professionals & Dignitaries",
    description:
      "The historic 100-year Centennial Convention for the National Bar Association — an expansive multi-day gathering in Chicago featuring high-profile keynotes, networking events, and the 'Igniting Justice' celebration.",
    image: "/n3.jpeg",
    imageSecondary: "/f3.jpeg",
    images: ["/n3.jpeg", "/f3.jpeg", "/n4.jpg", "/f2.jpeg"],
    tags: ["Centennial Celebration", "Legal Convention", "National Event"],
    layout: "split",
  },
  {
    id: "nba-midyear-conference",
    title: "NBA 45th Annual Midyear Conference",
    category: "Conferences & Galas",
    year: "2025",
    location: "Des Moines, IA",
    attendees: "Legal Scholars & Advocates",
    description:
      "Featuring the signature Heman Marion Sweatt Awards Luncheon honoring civil rights trailblazers. Renaissance provided full infrastructure management, including VIP seating, stage production, and banquet coordination.",
    image: "/e2.jpeg",
    imageSecondary: "/e1.jpeg",
    images: ["/e2.jpeg", "/e1.jpeg", "/e3.jpeg", "/f5.jpeg"],
    tags: ["Midyear Conference", "Awards Luncheon", "VIP Logistics"],
    layout: "wide",
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
