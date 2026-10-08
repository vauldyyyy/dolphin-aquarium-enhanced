import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import credits from "../../lib/catalog-image-credits.json";

export const metadata = {
  title: "Image Credits",
  description: "Credits and licenses for representative fish photographs in the Dolphin Aquarium & Pets catalog.",
  alternates: { canonical: "/image-credits" },
};

export default function ImageCreditsPage() {
  return (
    <>
      <Nav staticLight />
      <main id="main">
        <header className="page-top">
          <div className="wrap">
            <p className="crumbs"><Link href="/">Home</Link> / Image Credits</p>
            <p className="eyebrow eyebrow--gold">Catalog photography</p>
            <h1 className="display">Image Credits</h1>
            <p className="content-lede">Representative fish photographs used in our shop catalog.</p>
          </div>
        </header>
        <section className="content content--cream">
          <div className="wrap rights-body image-credits">
            <p>Catalog photos are representative and do not show fish currently in stock. Cards labelled “Illustrative image” use AI generated artwork to show the named variety and colour; they are not photographs of stock fish.</p>
            <ul>
              {credits.map((credit) => (
                <li key={credit.file}>
                  <strong>{credit.file}</strong> — <a href={credit.url} target="_blank" rel="noopener noreferrer">{credit.title}</a>
                  {" "}by {credit.artist}. {credit.licenseUrl ? <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a> : credit.license}.
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
