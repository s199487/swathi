import { useState } from "react";
import { useRouter } from "next/router";
import { createRequirement, getMe } from "../../lib/api";
import Navbar from "../../components/Navbar";

const OPPORTUNITY_TYPES = [
  { value: "franchise", label: "Franchise", color: "bg-franchise" },
  { value: "dealer", label: "Dealer", color: "bg-dealer" },
  { value: "associate", label: "Associate", color: "bg-associate" },
  { value: "job", label: "Job", color: "bg-job" },
];

export default function CreateRequirement() {
  const router = useRouter();
  const [form, setForm] = useState({
    opportunity_type: "franchise",
    title: "",
    industry: "",
    location: "",
    investment_min: "",
    investment_max: "",
    salary_min: "",
    salary_max: "",
    skills: "",
    experience_required: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const me = await getMe();
      const payload = {
        ...form,
        posted_by_type: me.user_type === "company" ? "company" : "individual",
        investment_min: form.investment_min || null,
        investment_max: form.investment_max || null,
        salary_min: form.salary_min || null,
        salary_max: form.salary_max || null,
      };
      await createRequirement(payload);
      router.push("/dashboard");
    } catch (err) {
      setError("Could not post requirement. Check the fields and try again.");
    }
  };

  const isJob = form.opportunity_type === "job";
  const inputClass =
    "w-full bg-black border border-rule rounded-lg px-4 py-2.5 mb-3 text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-offwhite/40";

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-lg mx-auto px-6 py-10">
          <h1 className="font-display font-bold text-2xl text-offwhite mb-6">Post a Requirement</h1>

          <form onSubmit={handleSubmit} className="bg-surface border border-rule rounded-2xl p-6">
            {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

            <label className="block text-xs text-offwhite/50 mb-1.5">Opportunity type</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {OPPORTUNITY_TYPES.map((o) => (
                <button
                  type="button"
                  key={o.value}
                  onClick={() => setForm({ ...form, opportunity_type: o.value })}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left ${
                    form.opportunity_type === o.value
                      ? "border-offwhite/50 bg-black text-offwhite"
                      : "border-rule text-offwhite/50 hover:border-offwhite/30"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${o.color}`} />
                  {o.label}
                </button>
              ))}
            </div>

            <input className={inputClass} placeholder="Title"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <input className={inputClass} placeholder="Industry"
              value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
            <input className={inputClass} placeholder="Location"
              value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />

            {!isJob && (
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input type="number" className={inputClass.replace("mb-3", "")} placeholder="Investment min"
                  value={form.investment_min} onChange={(e) => setForm({ ...form, investment_min: e.target.value })} />
                <input type="number" className={inputClass.replace("mb-3", "")} placeholder="Investment max"
                  value={form.investment_max} onChange={(e) => setForm({ ...form, investment_max: e.target.value })} />
              </div>
            )}

            {isJob && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input type="number" className={inputClass.replace("mb-3", "")} placeholder="Salary min"
                    value={form.salary_min} onChange={(e) => setForm({ ...form, salary_min: e.target.value })} />
                  <input type="number" className={inputClass.replace("mb-3", "")} placeholder="Salary max"
                    value={form.salary_max} onChange={(e) => setForm({ ...form, salary_max: e.target.value })} />
                </div>
                <input className={inputClass} placeholder="Skills (comma-separated)"
                  value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
                <input className={inputClass} placeholder="Experience required"
                  value={form.experience_required} onChange={(e) => setForm({ ...form, experience_required: e.target.value })} />
              </>
            )}

            <textarea className={`${inputClass} mb-5`} placeholder="Description" rows={4}
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <button type="submit" className="w-full bg-offwhite text-black rounded-full py-2.5 font-medium hover:bg-offwhite/90">
              Post requirement
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
