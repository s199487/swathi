import { useEffect, useState } from "react";
import { listRequirements } from "../../lib/api";
import Navbar from "../../components/Navbar";

const OPPORTUNITY_TYPES = [
  { value: "franchise", label: "Franchise", color: "bg-franchise" },
  { value: "dealer", label: "Dealer", color: "bg-dealer" },
  { value: "associate", label: "Associate", color: "bg-associate" },
  { value: "job", label: "Job", color: "bg-job" },
];

const COLOR_MAP = Object.fromEntries(OPPORTUNITY_TYPES.map((t) => [t.value, t.color]));

export default function Opportunities() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ opportunity_type: "", location: "" });
  const [loading, setLoading] = useState(true);

  const load = async (params) => {
    setLoading(true);
    try {
      const data = await listRequirements(params);
      setItems(data.results || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load({});
  }, []);

  const applyFilters = (e) => {
    e.preventDefault();
    const params = {};
    if (filters.opportunity_type) params.opportunity_type = filters.opportunity_type;
    if (filters.location) params.location = filters.location;
    load(params);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="font-display font-bold text-3xl text-offwhite mb-6">Opportunities</h1>

          <form onSubmit={applyFilters} className="flex flex-wrap gap-3 mb-8">
            <select
              className="bg-surface border border-rule rounded-lg px-4 py-2.5 text-offwhite focus:outline-none focus:border-offwhite/40"
              value={filters.opportunity_type}
              onChange={(e) => setFilters({ ...filters, opportunity_type: e.target.value })}
            >
              <option value="">All types</option>
              {OPPORTUNITY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <input
              className="bg-surface border border-rule rounded-lg px-4 py-2.5 flex-1 min-w-[200px] text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-offwhite/40"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-offwhite text-black rounded-full font-medium hover:bg-offwhite/90"
            >
              Filter
            </button>
          </form>

          {loading ? (
            <p className="text-offwhite/50">Loading...</p>
          ) : items.length === 0 ? (
            <div className="bg-surface border border-dashed border-rule rounded-2xl p-10 text-center">
              <p className="text-offwhite/50 text-sm">No opportunities found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-surface border border-rule rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${COLOR_MAP[item.opportunity_type] || "bg-offwhite/30"}`} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-offwhite/40">
                      {item.opportunity_type}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-lg text-offwhite mb-1">{item.title}</h3>
                  <p className="text-sm text-offwhite/50 mb-2">
                    {item.location} &middot; {item.industry}
                  </p>
                  {item.description && (
                    <p className="text-sm text-offwhite/40">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
