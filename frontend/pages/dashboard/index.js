import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getMe, listRequirements } from "../../lib/api";
import Navbar from "../../components/Navbar";

const TYPE_COLOR = {
  franchise: "bg-franchise",
  dealer: "bg-dealer",
  associate: "bg-associate",
  job: "bg-job",
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [myRequirements, setMyRequirements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
        const reqs = await listRequirements({});
        setMyRequirements(reqs.results?.filter((r) => r.user === me.id) || []);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center text-offwhite/50">
        Loading...
      </main>
    );

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-job mb-2">
                {user?.user_type}
              </p>
              <h1 className="font-display font-bold text-3xl text-offwhite">
                Welcome, {user?.username}
              </h1>
            </div>
            <Link
              href="/requirements/create"
              className="px-6 py-2.5 bg-offwhite text-black rounded-full font-medium hover:bg-offwhite/90 whitespace-nowrap"
            >
              Post a requirement
            </Link>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-offwhite/40 mb-4">
            My Requirements
          </p>

          {myRequirements.length === 0 ? (
            <div className="bg-surface border border-dashed border-rule rounded-2xl p-10 text-center">
              <p className="text-offwhite/50 text-sm mb-4">
                You haven&apos;t posted anything yet.
              </p>
              <Link
                href="/requirements/create"
                className="text-sm text-offwhite underline underline-offset-4 hover:text-job"
              >
                Post your first requirement
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {myRequirements.map((req) => (
                <div
                  key={req.id}
                  className="bg-surface border border-rule rounded-2xl p-5 hover:border-offwhite/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${TYPE_COLOR[req.opportunity_type] || "bg-offwhite/30"}`} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-offwhite/40">
                      {req.opportunity_type}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-lg text-offwhite mb-1">
                    {req.title}
                  </h3>
                  <p className="text-sm text-offwhite/50 mb-4">
                    {req.location} &middot; {req.industry}
                  </p>
                  <Link
                    href={`/requirements/${req.id}/matches`}
                    className="text-sm text-job hover:underline"
                  >
                    View matches &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-rule">
            <Link href="/opportunities" className="text-sm text-offwhite/60 hover:text-offwhite">
              Browse all opportunities &rarr;
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
