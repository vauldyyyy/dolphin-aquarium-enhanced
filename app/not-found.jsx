import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Nav staticLight />
      <main className="content content--cream" style={{ minHeight: "70vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div className="wrap">
          <p className="eyebrow eyebrow--gold">404 — Off the map</p>
          <h1 className="display" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
            This tank is empty.
          </h1>
          <p className="content-lede" style={{ margin: "18px auto 28px", maxWidth: 480 }}>
            The page you&apos;re looking for swam away. Let&apos;s get you back to clearer waters.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn--grad" href="/">
              Back to home
            </Link>
            <Link className="btn btn--ghost" href="/shop">
              Browse the shop
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
