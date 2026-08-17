import Link from "next/link";

const BRANCHES = [
  {
    key: "franchise",
    color: "bg-franchise",
    name: "Franchise",
    blurb: "Companies list franchise terms. Individuals find a franchise to run.",
  },
  {
    key: "dealer",
    color: "bg-dealer",
    name: "Dealer",
    blurb: "Companies appoint area dealers. Individuals pick up a dealership.",
  },
  {
    key: "associate",
    color: "bg-associate",
    name: "Associate",
    blurb: "Companies bring on business associates. Individuals partner on growth.",
  },
  {
    key: "job",
    color: "bg-job",
    name: "Job",
    blurb: "Companies hire for a role. Individuals apply for work.",
  },
];

export default function Home() {
  return (
    <main className="dark-page min-h-screen font-body">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <span className="font-display font-bold text-xl tracking-tight text-offwhite">
          SPEC BUSINESS
        </span>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-5 py-2 text-sm text-offwhite/80 hover:text-offwhite"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 text-sm bg-offwhite text-black rounded-full font-medium hover:bg-offwhite/90"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20">
        <p className="font-mono text-xs uppercase tracking-widest text-job mb-5">
          SPEC Group &middot; Business Networking Platform
        </p>
        <h1 className="font-display font-bold text-5xl md:text-6xl leading-[1.05] text-offwhite mb-6">
          Empowering businesses, entrepreneurs &amp; individuals under one platform.
        </h1>
        <p className="text-offwhite/60 text-lg max-w-2xl mb-10">
          Companies register what they need, franchisees, dealers, associates,
          or employees. Individuals register what they&apos;re looking for.
          SpecBusiness matches the two sides and shows exactly why each match
          works.
        </p>
        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-7 py-3.5 bg-offwhite text-black rounded-full font-medium hover:bg-offwhite/90"
          >
            Get started
          </Link>
          <Link
            href="/opportunities"
            className="px-7 py-3.5 border border-offwhite/20 text-offwhite rounded-full font-medium hover:border-offwhite/50"
          >
            Browse opportunities
          </Link>
        </div>
      </section>

      {/* Four branches, color-blocked */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40 mb-6">
          Four ways to connect
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          {BRANCHES.map((b) => (
            <Link
              key={b.key}
              href="/register"
              className="group relative rounded-2xl p-6 h-52 flex flex-col justify-between overflow-hidden bg-surface border border-rule hover:border-offwhite/30 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full ${b.color}`} />
              <div>
                <h3 className="font-display font-semibold text-xl text-offwhite mb-2">
                  {b.name}
                </h3>
                <p className="text-sm text-offwhite/50 leading-snug">{b.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About, real company content */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40 mb-6">
          About SPEC Group
        </p>
        <p className="text-offwhite/70 text-lg leading-relaxed mb-4">
          SPEC Group is a professional business networking organization
          committed to creating opportunities that help businesses connect,
          collaborate, and grow.
        </p>
        <p className="text-offwhite/70 text-lg leading-relaxed">
          Our mission is to build a thriving business community where
          entrepreneurs and organizations support each other through
          networking, knowledge sharing, partnerships, and referrals. We
          believe that great businesses don&apos;t grow alone, they grow
          together.
        </p>
      </section>

      {/* Footer, real contact info */}
      <footer className="border-t border-rule">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-offwhite/50">
          <div>
            <p className="font-display font-semibold text-offwhite mb-2">
              SPEC BUSINESS
            </p>
            <p>Amurathavani Building, 2nd Floor,</p>
            <p>Secunderabad, Telangana &ndash; 500003</p>
            <p className="mt-1">Phone: 88850 73555</p>
          </div>
          <div className="text-offwhite/30">Copyright &copy; 2026. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
