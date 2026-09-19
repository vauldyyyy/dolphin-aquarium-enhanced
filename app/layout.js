import { Fraunces, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import "./sections.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

/* Handwritten accents in the Visit section ("Inspiring a kinder brighter world", "Goa") */
const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const SITE_URL = "https://dolphinaquariumandpets.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dolphin Aquarium & Pets — Goa's Premier Aquarium & Pet Store | Madgaon, Goa",
    template: "%s | Dolphin Aquarium & Pets",
  },
  description:
    "Goa's most trusted aquarium & pet destination since 1992. Designer & custom-built aquariums, exotic fish, premium pets, walk-in aviaries, grooming, microchipping and luxury pet supplies — all under one roof in Madgaon.",
  keywords: [
    "aquarium shop Goa",
    "pet store Madgaon",
    "custom aquarium Goa",
    "exotic fish Goa",
    "aquarium builder Margao",
    "pet shop Navelim",
    "aquascaping Goa",
    "koi carp Goa",
    "pet grooming Goa",
    "Dolphin Aquarium and Pets",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Dolphin Aquarium & Pets",
    title: "Dolphin Aquarium & Pets — Goa's Premier Aquarium & Pet Destination",
    description:
      "Designer aquariums, exotic fish and premium pets in Madgaon, Goa — trusted since 1992, with 2,00,000+ happy clients.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/assets/hero-aquarium.jpg",
        width: 1200,
        height: 630,
        alt: "Inside the Dolphin Aquarium & Pets showroom — glowing designer aquariums",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolphin Aquarium & Pets — Madgaon, Goa",
    description:
      "Designer aquariums, exotic fish and premium pets. Goa's most trusted pet destination since 1992.",
    images: ["/assets/hero-aquarium.jpg"],
  },
  robots: { index: true, follow: true },
};

/* LocalBusiness structured data — powers Google's rich result (hours,
   rating, address panel). Hours mirror lib/business.js. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PetStore",
  name: "Dolphin Aquarium & Pets",
  url: SITE_URL,
  telephone: "+919953858521",
  image: `${SITE_URL}/assets/hero-aquarium.jpg`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No G 4, Apollo Apt Down, Navelim Flyover, Sanscar Society",
    addressLocality: "Madgaon",
    addressRegion: "Goa",
    postalCode: "403601",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:30", closes: "14:00" },
  ],
  sameAs: [
    "https://www.facebook.com/dolphinaquariumandpets",
    "https://www.instagram.com/dolphinaquariumandpets/",
  ],
  foundingDate: "1992",
  description:
    "Goa's premier aquarium and pet store: designer & custom-built aquariums, exotic and ornamental fish, premium pets, live plants, filtration systems, grooming, vaccinations and microchipping.",
};

export const viewport = { themeColor: "#050505" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${script.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
