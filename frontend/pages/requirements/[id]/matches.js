import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMatches } from "../../../lib/api";
import Navbar from "../../../components/Navbar";

export default function Matches() {
  const router = useRouter();
  const { id } = router.query;
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getMatches(id);
        setMatches(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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
        <div className="max-w-2xl mx-auto px-6 py-10">
          <h1 className="font-display font-bold text-2xl text-offwhite mb-6">Matches</h1>

          {matches.length === 0 ? (
            <div className="bg-surface border border-dashed border-rule rounded-2xl p-10 text-center">
              <p className="text-offwhite/50 text-sm">No matches yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((m) => (
                <div
                  key={m.requirement.id}
                  className="bg-surface border border-rule rounded-2xl p-5 relative"
                >
                  <div className="flex justify-between items-start mb-3 pr-16">
                    <div>
                      <h3 className="font-display font-medium text-lg text-offwhite">
                        {m.requirement.title}
                      </h3>
                      <p className="text-sm text-offwhite/50">
                        {m.requirement.location} &middot; {m.requirement.industry}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(m.breakdown).map(([key, ok]) => (
                      <span
                        key={key}
                        className={`font-mono text-[10px] px-2.5 py-1 rounded-full ${
                          ok ? "bg-dealer/10 text-dealer" : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {key.replace(/_/g, " ")}: {ok ? "match" : "no match"}
                      </span>
                    ))}
                  </div>

                  {/* the stamp */}
                  <div className="absolute top-5 right-5 w-16 h-16 rounded-full border-2 border-dealer flex items-center justify-center bg-black rotate-[-6deg]">
                    <div className="text-center">
                      <p className="font-display text-base leading-none text-dealer">{m.score}%</p>
                      <p className="font-mono text-[7px] text-dealer uppercase mt-0.5">matched</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
