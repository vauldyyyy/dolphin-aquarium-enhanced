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

export const metadata = {
  title: "Dolphin Aquarium & Pets — Living Collection | Madgaon, Goa",
  description:
    "Dolphin Aquarium & Pets, Goa's premier aquarium & pet destination since 1992. A cinematic journey through our aquatic collection and our garden of companions.",
  metadataBase: new URL("https://dolphinaquariumandpets.com"),
  openGraph: {
    title: "Dolphin Aquarium & Pets — Living Collection",
    description:
      "Goa's premier aquarium & pet destination since 1992. Custom aquariums, exotic fish, premium pets & luxury supplies.",
    type: "website",
  },
};

export const viewport = { themeColor: "#050505" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
