import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";

export default function RightsPage() {
  return (
    <>
      <Nav staticLight />
      <main id="main">
        <header className="page-top">
          <div className="wrap">
            <p className="crumbs"><Link href="/">Home</Link> / Rights &amp; permissions</p>
            <p className="eyebrow eyebrow--gold">CREATOR CREDIT</p>
            <h1 className="display">Rights &amp; permissions</h1>
            <p className="content-lede">About the creation and permitted use of this website.</p>
          </div>
        </header>
        <div className="content content--cream">
          <div className="wrap rights-body">
            <div className="rights-credit">
              <p className="eyebrow eyebrow--gold">ORIGINAL PROJECT</p>
              <h2>Website created by Vauldan D&apos;Souza.</h2>
              <p>
                This website was designed and developed for Dolphin Aquarium &amp; Pets.
                Original site design, code, copy, and original visuals © {new Date().getFullYear()}
                {" "}Vauldan D&apos;Souza. All rights reserved to the extent protected by law.
              </p>
            </div>
            <div className="rights-sections">
              <section>
                <h3>Reuse of original work</h3>
                <p>
                  No general licence is granted to copy, redistribute, or present the original
                  site code, copy, artwork, or distinctive visual work as your own. Public
                  access to this website or its repository does not itself give permission
                  to republish the site. Uses allowed by law or GitHub&apos;s platform terms
                  are unaffected. For other uses, request permission first.
                </p>
              </section>
              <section>
                <h3>Unauthorised copying</h3>
                <p>
                  Unauthorised reproduction of protected work may lead to takedown requests
                  and legal action. Any claim depends on the ownership, originality, and
                  use of the particular material.
                </p>
              </section>
              <section>
                <h3>Other materials and project history</h3>
                <p>
                  Business names, facts, reviews, and third-party or licensed material remain
                  subject to their respective owners&apos; rights. The public
                  {" "}<a href="https://github.com/vauldyyyy/dolphin-aquarium-enhanced" target="_blank" rel="noopener noreferrer">project repository</a>
                  {" "}records the site&apos;s development history.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
