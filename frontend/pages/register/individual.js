import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { registerUser } from "../../lib/api";

const OPPORTUNITY_TYPES = [
  { value: "franchise", label: "Franchise", color: "bg-franchise" },
  { value: "dealer", label: "Dealership", color: "bg-dealer" },
  { value: "associate", label: "Associate Opportunity", color: "bg-associate" },
  { value: "job", label: "Job", color: "bg-job" },
];

export default function RegisterIndividual() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "", phone: "" });
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");

  const toggleInterest = (value) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser({ ...form, user_type: "individual" });
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("pending_interests", JSON.stringify(interests));
      router.push("/dashboard");
    } catch (err) {
      const data = err.response?.data;
      const detail =
        (data && typeof data === "object" && Object.values(data).flat().join(" ")) ||
        "Registration failed. Please try again.";
      setError(detail);
    }
  };

  const inputClass =
    "w-full bg-black border border-rule rounded-lg px-4 py-2.5 mb-3 text-offwhite placeholder-offwhite/30 focus:outline-none focus:border-offwhite/40";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="font-display font-bold text-xl text-offwhite mb-8 block text-center">
          SPEC BUSINESS
        </Link>
        <form onSubmit={handleSubmit} className="bg-surface border border-rule rounded-2xl p-8">
          <h1 className="font-display font-semibold text-xl text-offwhite mb-6">
            Register as Individual
          </h1>
          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <input className={inputClass} placeholder="Username"
            value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input type="email" className={inputClass} placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className={inputClass} placeholder="Phone"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="password" className={`${inputClass} mb-5`} placeholder="Password"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />

          <p className="text-xs text-offwhite/50 mb-3">I am looking for:</p>
          <div className="mb-6 space-y-2">
            {OPPORTUNITY_TYPES.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 text-sm text-offwhite/80 cursor-pointer">
                <input type="checkbox" checked={interests.includes(opt.value)}
                  onChange={() => toggleInterest(opt.value)}
                  className="accent-offwhite" />
                <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                {opt.label}
              </label>
            ))}
          </div>

          <button type="submit" className="w-full bg-offwhite text-black rounded-full py-2.5 font-medium hover:bg-offwhite/90">
            Create account
          </button>
        </form>
      </div>
    </main>
  );
}
